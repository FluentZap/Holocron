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

    public async Task updateServer(string message)
    {
      await Clients.Caller.SendAsync("send", message + ": First Data And other things");
    }

    public async Task CreateUser(UserData user)
    {
      (ListOf_DBResult flag, TokenReturn tokenReturn) = await HoloData.CreateUser(new User() { Name = user.Name, Password = user.Password });
      if (connectedUsers.ContainsKey(Context.ConnectionId))
      {
        connectedUsers[Context.ConnectionId].SessionToken = tokenReturn.SessionToken.ToString();
        await Clients.Caller.SendAsync("ServerLogin", flag, tokenReturn);
      }
    }

    public async Task LoginUser(UserData user)
    {
      if (user.Name != "" && user.Password != "")
      {
        (ListOf_DBResult flag, TokenReturn tokenReturn) = await HoloData.LoginUser(new User() { Name = user.Name, Password = user.Password });
        if (tokenReturn.LoggedIn)
        {
          if (connectedUsers.ContainsKey(Context.ConnectionId))
          {
            connectedUsers[Context.ConnectionId].SessionToken = tokenReturn.SessionToken.ToString();
            await Clients.Caller.SendAsync("ServerLogin", flag, tokenReturn);
            System.Console.WriteLine(tokenReturn.LoggedIn);
            System.Console.WriteLine($"Connected User: {Context.ConnectionId}");
            System.Console.WriteLine($"Session Token: {tokenReturn.SessionToken}");
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

    public async Task LoginUserToken(UserData user)
    {
      if (user.sessionToken != "")
      {
        (ListOf_DBResult flag, TokenReturn tokenReturn) = await HoloData.LoginUserToken(new User() { SessionToken = user.sessionToken });
        if (tokenReturn.LoggedIn)
        {
          if (connectedUsers.ContainsKey(Context.ConnectionId))
          {
            connectedUsers[Context.ConnectionId].SessionToken = tokenReturn.SessionToken.ToString();
            await Clients.Caller.SendAsync("ServerLogin", flag, tokenReturn);
            System.Console.WriteLine($"Token User: {Context.ConnectionId}");
            System.Console.WriteLine($"Session Token: {tokenReturn.SessionToken}");
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

    public async Task FetchRoster(UserData user)
    {
      if (connectedUsers.ContainsKey(Context.ConnectionId) && user.sessionToken == connectedUsers[Context.ConnectionId].SessionToken)
      {
        (ListOf_DBResult flag, List<Character> characters) = await HoloData.FetchCharacters(user.sessionToken);

        await Clients.Caller.SendAsync("ClientGetCharacters", flag, characters);
      }
    }

    public async Task FetchGroups(UserData user)
    {
      if (connectedUsers.ContainsKey(Context.ConnectionId) && user.sessionToken == connectedUsers[Context.ConnectionId].SessionToken)
      {
        (ListOf_DBResult flag, List<Group> groups) = await HoloData.FetchGroups(connectedUsers[Context.ConnectionId].SessionToken);
        await Clients.Caller.SendAsync("ClientGetGroups", flag, groups);
      }
    }

    public async Task CreateCharacter(CharacterData character)
    {
      Character NewCharacter = character;
      NewCharacter.Specializations = string.Join(",", character.SpecializationsList);
      NewCharacter.SkillsCareer = string.Join(",", character.SkillsCareerList);
      NewCharacter.SkillsCareerFree = string.Join(",", character.SkillsCareerFreeList);
      NewCharacter.SkillsSpec = string.Join(",", character.SkillsSpecList);
      NewCharacter.SkillsSpecFree = string.Join(",", character.SkillsSpecFreeList);
      await HoloData.CreateCharacter(connectedUsers[Context.ConnectionId].SessionToken, NewCharacter);

      if (connectedUsers.ContainsKey(Context.ConnectionId))
      {
        (ListOf_DBResult flag, List<Character> characters) = await HoloData.FetchCharacters(connectedUsers[Context.ConnectionId].SessionToken);
        foreach ((var key, var value) in connectedUsers.Where(x => x.Value.SessionToken == connectedUsers[Context.ConnectionId].SessionToken))
        {
          await Clients.Client(key).SendAsync("ClientGetCharacters", flag, characters);
        }
      }
    }

    public async Task CreateGroup(Group NewGroup)
    {
      await HoloData.CreateGroup(connectedUsers[Context.ConnectionId].SessionToken, new Group() { Name = NewGroup.Name, ConnectionId = NewGroup.ConnectionId });
      if (connectedUsers.ContainsKey(Context.ConnectionId))
      {
        (ListOf_DBResult flag, List<Group> groups) = await HoloData.FetchGroups(connectedUsers[Context.ConnectionId].SessionToken);
        foreach ((var key, var value) in connectedUsers.Where(x => x.Value.SessionToken == connectedUsers[Context.ConnectionId].SessionToken))
        {
          await Clients.Client(key).SendAsync("ClientGetGroups", flag, groups);
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
}
