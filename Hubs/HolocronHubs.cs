using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Newtonsoft.Json;
using Holocron.Context;

namespace Holocron.Hubs
{
  public class HolocronHub : Hub
  {
    public static IHubCallerClients HubContext;

    static Dictionary<string, ConnenctedUser> connectedUsers = new Dictionary<string, ConnenctedUser>();

    public override Task OnConnectedAsync()
    {

      if (connectedUsers.ContainsKey(Context.ConnectionId))
      {
        connectedUsers.Remove(Context.ConnectionId);
      }
      connectedUsers.Add(Context.ConnectionId, new ConnenctedUser());
      return base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
      connectedUsers.Remove(Context.ConnectionId);
      await base.OnDisconnectedAsync(exception);
    }

    public async Task CreateUser(UserData user)
    {
      (ListOf_DBResult flag, string SessionToken) = await HoloData.CreateUser(new User() { Name = user.Name, Password = user.Password });
      if (connectedUsers.ContainsKey(Context.ConnectionId))
      {
        connectedUsers[Context.ConnectionId].SessionToken = SessionToken.ToString();
        await Clients.Caller.SendAsync("ServerLogin", flag, SessionToken, user.Name);
      }
    }

    public async Task LoginUser(UserData user)
    {
      if (user.Name != "" && user.Password != "")
      {
        (ListOf_DBResult flag, string SessionToken) = await HoloData.LoginUser(new User() { Name = user.Name, Password = user.Password });
        if (flag == ListOf_DBResult.Success && SessionToken != null)
        {
          if (connectedUsers.ContainsKey(Context.ConnectionId))
          {
            connectedUsers[Context.ConnectionId].SessionToken = SessionToken.ToString();
            await Clients.Caller.SendAsync("ServerLogin", flag, SessionToken, user.Name);
            System.Console.WriteLine($"Connected User: {Context.ConnectionId}");
            System.Console.WriteLine($"Session Token: {SessionToken}");
          }
          else
          {
            System.Console.WriteLine("Bad Client Token");
          }
        }
        else
        {
          System.Console.WriteLine("Login Rejected");
          await Clients.Caller.SendAsync("ServerLogin", flag, null);
        }
      }
    }

    public async Task LoginUserToken(string SessionToken)
    {
      if (SessionToken != null)
      {
        (ListOf_DBResult flag, string userName) = await HoloData.LoginUserToken(SessionToken);
        if (flag == ListOf_DBResult.Success)
        {
          if (connectedUsers.ContainsKey(Context.ConnectionId))
          {
            connectedUsers[Context.ConnectionId].SessionToken = SessionToken;
            await Clients.Caller.SendAsync("ServerLogin", flag, SessionToken, userName);
            System.Console.WriteLine($"Token User: {Context.ConnectionId}");
            System.Console.WriteLine($"Session Token: {SessionToken}");
          }
          else
          {
            System.Console.WriteLine("Bad Client Token");
          }
        }
        else
        {
          System.Console.WriteLine("Login Rejected");
          await Clients.Caller.SendAsync("ServerLogin", flag);
        }
      }
    }

    public async Task FetchRoster(string SessionToken)
    {
      if (SessionToken != null && connectedUsers.ContainsKey(Context.ConnectionId) && SessionToken == connectedUsers[Context.ConnectionId].SessionToken)
      {
        (ListOf_DBResult flag, List<Character> characters) = await HoloData.FetchCharacters(SessionToken);
        UpdateModel updateModel = new UpdateModel();
        updateModel.AddCharacters(characters);
        ClientUpdates.SendUpdate(Clients.Caller, flag, updateModel);
      }
    }

    public async Task FetchGroups(string SessionToken)
    {
      if (SessionToken != null && connectedUsers.ContainsKey(Context.ConnectionId) && SessionToken == connectedUsers[Context.ConnectionId].SessionToken)
      {
        (ListOf_DBResult flag, List<Group> groups) = await HoloData.FetchGroups(connectedUsers[Context.ConnectionId].SessionToken);
        await Clients.Caller.SendAsync("ClientGetGroups", flag, groups);
      }
    }

    public async Task CreateCharacter(CharacterData character)
    {
      string SessionToken = connectedUsers[Context.ConnectionId].SessionToken;
      if (SessionToken != null && connectedUsers.ContainsKey(Context.ConnectionId))
      {
        Character NewCharacter = character;
        NewCharacter.Specializations = string.Join(",", character.SpecializationsList);
        NewCharacter.SkillsCareer = string.Join(",", character.SkillsCareerList);
        NewCharacter.SkillsCareerFree = string.Join(",", character.SkillsCareerFreeList);
        NewCharacter.SkillsSpec = string.Join(",", character.SkillsSpecList);
        NewCharacter.SkillsSpecFree = string.Join(",", character.SkillsSpecFreeList);
        await HoloData.CreateCharacter(SessionToken, NewCharacter);

        (ListOf_DBResult flag, List<Character> characters) = await HoloData.FetchCharacters(SessionToken);
        UpdateModel updateModel = new UpdateModel();
        updateModel.AddCharacters(characters);
        ClientUpdates.SendUpdate(connectedUsers.Where(x => x.Value.SessionToken == SessionToken).Select(x => Clients.Client(x.Key)).ToList(), flag, updateModel);
      }
    }

    public async Task CreateGroup(Group NewGroup)
    {
      string SessionToken = connectedUsers[Context.ConnectionId].SessionToken;
      if (SessionToken != null && connectedUsers.ContainsKey(Context.ConnectionId))
      {
        (ListOf_DBResult flag, Group group) = await HoloData.CreateGroup(SessionToken, new Group() { Name = NewGroup.Name, ConnectionId = NewGroup.ConnectionId });

        // (ListOf_DBResult flag, List<Character> characters) = await HoloData.FetchCharacters(SessionToken);
        UpdateModel updateModel = new UpdateModel();
        updateModel.AddCharacters(characters);
        ClientUpdates.SendUpdate(connectedUsers.Where(x => x.Value.SessionToken == SessionToken).Select(x => Clients.Client(x.Key)).ToList(), flag, updateModel);


        foreach ((var key, var value) in connectedUsers.Where(x => x.Value.SessionToken == SessionToken))
        {
          await Clients.Client(key).SendAsync("ClientGetGroup", flag, group);
        }

      }
    }

    public async Task JoinGroup(Group NewGroup)
    {
      (ListOf_DBResult flag, Group group) = await HoloData.JoinGroup(connectedUsers[Context.ConnectionId].SessionToken, new Group() { Name = NewGroup.Name, ConnectionId = NewGroup.ConnectionId });

      List<string> updateList = new List<string>();
      foreach (var item in group.Permissions)
      {
        updateList.Add(item.User.SessionToken);
        item.Group = null;
        item.User.Password = "";
        item.User.SessionToken = "";
      }

      if (flag == ListOf_DBResult.Success)
      {
        foreach (var SessionToken in updateList)
        {
          foreach ((var key, var value) in connectedUsers.Where(x => x.Value.SessionToken == SessionToken).ToList())
          {
            await Clients.Client(key).SendAsync("ClientGetGroup", flag, group);
          }
        }
      }
      else
      {
        foreach ((var key, var value) in connectedUsers.Where(x => x.Value.SessionToken == connectedUsers[Context.ConnectionId].SessionToken))
        {
          await Clients.Client(key).SendAsync("ClientGetGroup", flag, group);
        }
      }
    }

    public async Task VT49Connect(string verificationCode)
    {
      if (verificationCode == "34f6d465a525aa589271e66648d73773")
      {
        // connectedUsers[Context.ConnectionId].UserName = "VT49";
        connectedUsers[Context.ConnectionId].SessionToken = Context.ConnectionId;
      }
    }

    // public async Task RequestFiefdomData()
    // {			
    // 	GameState gameState;
    // 	List<Market> baseMarket;
    // 	List<Market> buyPrice = new List<Market>();
    // 	List<Market> sellPrice = new List<Market>();
    // 	Fief fief;
    // 	using (var db = new FiefContext())
    // 	{
    // 		gameState = db.GameState.FirstOrDefault();
    // 		baseMarket = db.Market.ToList();								
    // 		fief = db.Fiefdom.Where(f => f.SessionId == Context.ConnectionId).Include("FiefdomPlot").Include("FiefdomResources").FirstOrDefault();
    // 	}

    // 	for (int i = 0; i < baseMarket.Count; i++)
    // 	{
    // 		buyPrice.Add(new Market
    // 		{
    // 			Type = baseMarket[i].Type,
    // 			Price = FiefdomActions.GetMarketBuyPrice(baseMarket[i].Type, baseMarket[i].Price)
    // 		});
    // 		sellPrice.Add(new Market
    // 		{
    // 			Type = baseMarket[i].Type,
    // 			Price = FiefdomActions.GetMarketSellPrice(baseMarket[i].Type, baseMarket[i].Price)
    // 		});
    // 	}

    // 	if (fief != null)
    //     {
    // 		await Clients.Caller.SendAsync("RecieveFiefdomData", fief, gameState,
    // 				new GameValues
    // 				{
    // 					Ballots = FiefdomActions.Ballots,
    // 					Edicts = FiefdomActions.Edicts,
    // 					MarketTax = FiefdomActions.MarketTax,
    // 					baseMarket = baseMarket,
    // 					buyMarket = buyPrice,
    // 					sellMarket = sellPrice
    // 				});
    // 	}
    //     else
    //     {				
    //         await Clients.Caller.SendAsync("RecieveFiefdomData", null);
    //     }
    // }

    // public async Task UserLogin(string name)
    // {
    //     name = name.ToLower();
    //     if (FiefdomActions.UserExist(name))
    //     {
    //         FiefdomActions.UserUpdateSessionId(name, Context.ConnectionId);
    //     }
    //     else
    //     {
    //         FiefdomActions.CreateNewFiefdom(name, Context.ConnectionId);
    //     }
    //     await Clients.All.SendAsync("ServerMessage", name + " joined the session");
    // }

    // public async Task SubmitVote(int ballot, string vote)
    // {
    //     FiefdomActions.SubmitVote(Context.ConnectionId, ballot, vote);
    // }

    // public async Task BuyResource(string type, int quantity)
    // {			
    //     FiefdomActions.BuyResource(Context.ConnectionId, type, quantity);
    // }

    // public async Task SellResource(string type, int quantity)
    // {			
    // 	FiefdomActions.SellResource(Context.ConnectionId, type, quantity);
    // }

    //     public async Task BuyTitle()
    // {			
    // 	FiefdomActions.BuyTitle(Context.ConnectionId);
    // }


    // public async Task GetMarketPrice()
    // {
    // 	await Clients.Caller.SendAsync("ReceiveMarketPrices", FiefdomActions.GetMarketPrice());
    // }
    // public async Task BuildPlot(int id, string type)
    // {

    //     FiefdomActions.BuildPlot(Context.ConnectionId, id, type);
    // }

  }


  public static class ClientUpdates
  {
    //Send update to all effected clients
    public static async void SendUpdate(List<IClientProxy> clients, ListOf_DBResult flag, UpdateModel updateModel)
    {
      foreach (var client in clients)
      {
        await client.SendAsync("ClientUpdate", flag, updateModel);
      }
    }

    public static async void SendUpdate(IClientProxy client, ListOf_DBResult flag, UpdateModel updateModel)
    {
      await client.SendAsync("ClientUpdate", flag, updateModel);
    }
  }
}
