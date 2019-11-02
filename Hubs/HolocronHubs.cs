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
        (ListOf_DBResult flag, User dataUser) = await HoloData.LoginUser(new User() { Name = user.Name, Password = user.Password });
        if (connectedUsers.ContainsKey(Context.ConnectionId))
        {
          if (dataUser != null)
          {
            connectedUsers[Context.ConnectionId].SessionToken = dataUser.SessionToken.ToString();
          }

          UpdateModel updateModel = new UpdateModel();
          updateModel.AddUser(dataUser);
          await Clients.Caller.SendAsync("ServerLogin", flag, updateModel);
          System.Console.WriteLine($"Connected User: {Context.ConnectionId}");
          System.Console.WriteLine($"Session Token: {dataUser.SessionToken}");
        }
        else
        {
          System.Console.WriteLine("Bad Client Token");
        }
      }
    }

    public async Task LogoutUser()
    {
      if (connectedUsers.ContainsKey(Context.ConnectionId))
      {
        await Task.Run(() => connectedUsers[Context.ConnectionId].SessionToken = "");
      }
      else
      {
        System.Console.WriteLine("Bad Client Token");
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
        (ListOf_DBResult flag, List<Group> groups) = await HoloData.FetchGroups(SessionToken);
        UpdateModel updateModel = new UpdateModel();
        updateModel.AddGroups(groups);
        ClientUpdates.SendUpdate(Clients.Caller, flag, updateModel);
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
        if (flag == ListOf_DBResult.Success)
        {
          UpdateModel updateModel = new UpdateModel();
          updateModel.AddGroup(group);
          ClientUpdates.SendUpdate(connectedUsers.Where(x => x.Value.SessionToken == SessionToken).Select(x => Clients.Client(x.Key)).ToList(), flag, updateModel);
        }
        else
        {
          ClientUpdates.SendUpdate(connectedUsers.Where(x => x.Value.SessionToken == SessionToken).Select(x => Clients.Client(x.Key)).ToList(), flag);
        }
      }
    }

    public async Task JoinGroup(Group NewGroup)
    {
      string SessionToken = connectedUsers[Context.ConnectionId].SessionToken;
      if (SessionToken != null && connectedUsers.ContainsKey(Context.ConnectionId))
      {
        (ListOf_DBResult flag, Group group) = await HoloData.JoinGroup(SessionToken, new Group() { Name = NewGroup.Name, ConnectionId = NewGroup.ConnectionId });
        if (flag == ListOf_DBResult.Success)
        {
          UpdateModel updateModel = new UpdateModel();
          updateModel.AddGroup(group);
          IEnumerable<string> playerTokens = group.Permissions.Select(x => x.User.SessionToken);
          ClientUpdates.SendUpdate(connectedUsers.Where(x => playerTokens.Contains(x.Value.SessionToken)).Select(x => Clients.Client(x.Key)).ToList(), flag, updateModel);
        }
        else
        {
          ClientUpdates.SendUpdate(connectedUsers.Where(x => x.Value.SessionToken == SessionToken).Select(x => Clients.Client(x.Key)).ToList(), flag);
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

    public static async void SendUpdate(List<IClientProxy> clients, ListOf_DBResult flag)
    {
      foreach (var client in clients)
      {
        await client.SendAsync("ClientUpdate", flag);
      }
    }
  }
}
