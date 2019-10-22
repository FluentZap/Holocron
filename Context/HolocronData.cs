using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Holocron.Context
{

  public enum ListOf_DBResult
  {
    Success,
    Duplicate,
    NotFound,
    FormatError,
    SessionExpired
  }


  public class TokenReturn
  {
    public string SessionToken;
    public bool LoggedIn = false;
  }

  public static class HoloData
  {
    public static async Task<(ListOf_DBResult, TokenReturn)> CreateUser(User user)
    {
      using (var db = new HolocronContext())
      {
        if (await db.Users.CountAsync(x => x.Name == user.Name) == 0)
        {
          Guid g = Guid.NewGuid();
          user.SessionToken = g.ToString();

          await db.Users.AddAsync(user);
          await db.SaveChangesAsync();
          return (ListOf_DBResult.Success, new TokenReturn() { SessionToken = user.SessionToken, LoggedIn = true });
        }
        else
        {
          return (ListOf_DBResult.Duplicate, null);
        }
      }
    }

    public static async Task<(ListOf_DBResult, TokenReturn)> LoginUser(User user)
    {
      using (var db = new HolocronContext())
      {
        User dataUser = await db.Users.Where(x => x.Name == user.Name).FirstOrDefaultAsync();
        if (dataUser != null && dataUser.Password == user.Password)
        {
          return (ListOf_DBResult.Success, new TokenReturn() { SessionToken = dataUser.SessionToken, LoggedIn = true });
        }
        return (ListOf_DBResult.NotFound, null);
      }
    }

    public static async Task<(ListOf_DBResult, TokenReturn)> LoginUserToken(User user)
    {
      using (var db = new HolocronContext())
      {
        User dataUser = await db.Users.Where(x => x.SessionToken == user.SessionToken).FirstOrDefaultAsync();
        if (dataUser != null)
        {
          return (ListOf_DBResult.Success, new TokenReturn() { SessionToken = dataUser.SessionToken, LoggedIn = true });
        }
        return (ListOf_DBResult.NotFound, null);
      }
    }

    public static async Task<(ListOf_DBResult, List<Character>)> FetchCharacters(string SessionToken)
    {
      using (var db = new HolocronContext())
      {
        User dataUser = await db.Users.Where(x => x.SessionToken == SessionToken)
        .Include(u => u.Characters)
          .ThenInclude(c => c.SkillsBuy)
        .Include(u => u.Characters)
          .ThenInclude(c => c.Characteristics)
        .Include(u => u.Characters)
          .ThenInclude(c => c.CharacteristicsBuy)
        .FirstOrDefaultAsync();

        if (dataUser != null)
        {
          return (ListOf_DBResult.Success, dataUser.Characters);
        }
        return (ListOf_DBResult.NotFound, null);
      }
    }

    public static async Task<(ListOf_DBResult, List<Group>)> FetchGroups(string SessionToken)
    {
      if (SessionToken != null)
      {
        using (var db = new HolocronContext())
        {
          User dataUser = await db.Users.FirstAsync(x => x.SessionToken == SessionToken);
          if (dataUser != null)
          {
            List<Group> groups = await db.Permissions.Where(x => x.User.Id == dataUser.Id).Select(x => x.Group)
            .Include(g => g.Permissions)
              .ThenInclude(x => x.User)
            .Include(g => g.GroupCharacters)
            .Include(g => g.Inventory)
            .Include(g => g.Ships)
            .ToListAsync();
            if (groups != null)
            {
              foreach (var item in groups)
              {
                foreach (var per in item.Permissions)
                {
                  per.Group = null;
                  per.User = new User() { Name = per.User.Name, Id = per.User.Id };
                }
              }
              return (ListOf_DBResult.Success, groups);
            }
          }
          return (ListOf_DBResult.NotFound, null);
        }
      }
      else
      {
        return (ListOf_DBResult.SessionExpired, null);
      }
    }

    public static async Task<ListOf_DBResult> CreateCharacter(string SessionToken, Character character)
    {
      using (var db = new HolocronContext())
      {
        User dataUser = await db.Users.Where(x => x.SessionToken == SessionToken).Include("Characters").FirstOrDefaultAsync();
        if (dataUser != null)
        {
          dataUser.Characters.Add(character);
          await db.SaveChangesAsync();
          return ListOf_DBResult.Success;
        }
        return ListOf_DBResult.FormatError;
      }
    }

    public static async Task<ListOf_DBResult> CreateGroup(string SessionToken, Group group)
    {
      using (var db = new HolocronContext())
      {
        User dataUser = await db.Users.Where(x => x.SessionToken == SessionToken).FirstOrDefaultAsync();
        if (await db.Groups.CountAsync(x => x.Name == group.Name) == 0)
        {
          if (group.ConnectionId != "" && group.Name != "")
          {
            // group.Users.Add(dataUser);
            group.Permissions.Add(new Permission()
            {
              User = dataUser,
              PermissionGroup = "Admin"
            });
            db.Groups.Add(group);
            await db.SaveChangesAsync();
            return ListOf_DBResult.Success;
          }
          else
          {
            return ListOf_DBResult.FormatError;
          }
        }
        else
        {
          return ListOf_DBResult.Duplicate;
        }
      }
    }
  }



  // public static partial class FiefdomActions
  // {
  // 	public static List<string> Ballots = new List<string> { };
  // 	public static List<Edict> Edicts = new List<Edict> { };
  // 	public static int MarketTax { get; set; }

  // 	static FiefdomActions()
  // 	{
  // 		MarketTax = 0;
  // 	}
  // 	//Data Calls

  // 	public static void CreateNewFiefdom(string name, string sessionId)
  //     {
  //         using (var db = new FiefContext())
  //         {
  //             Fief fief = new Fief { Name = name, SessionId = sessionId, Title = 0 };
  //             fief.FiefdomResources.Add(new FiefdomResources { Type = "Gold", Quantity = 1000 });
  //             fief.FiefdomResources.Add(new FiefdomResources { Type = "Wood", Quantity = 10 });
  //             fief.FiefdomResources.Add(new FiefdomResources { Type = "Stone", Quantity = 10 });
  //             fief.FiefdomResources.Add(new FiefdomResources { Type = "Food", Quantity = 10 });                
  //             for (int i = 0; i < 10; i++)
  //             {
  //                 fief.FiefdomPlot.Add(new FiefdomPlot { Type = "Locked" });
  //             }
  //             fief.FiefdomPlot[4].Type = "Empty";
  //             db.Fiefdom.Add(fief);
  //             db.SaveChanges();
  //         }
  //     }

  //     public static void UserUpdateSessionId(string name, string sessionId)
  //     {
  //         using (var db = new FiefContext())
  //         {
  //             var user = db.Fiefdom.Where(f => f.Name == name).FirstOrDefault();
  //             user.SessionId = sessionId;
  //             db.SaveChanges();
  //         }
  //     }

  // 	public static void BuildPlot(string sessionId, int id, string type)
  //     {
  //         using (var db = new FiefContext())
  //         {
  // 			List<FiefdomResources> cost = new List<FiefdomResources>{
  //                 new FiefdomResources{Type = "Gold", Quantity = 500}, 
  //                 new FiefdomResources{Type = "Food", Quantity = 5}, 
  //                 new FiefdomResources{Type = "Stone", Quantity = 5}, 
  //                 new FiefdomResources{Type = "Wood", Quantity = 5}};
  //             Fief fief = db.Fiefdom.Where(f => f.SessionId == sessionId).Include("FiefdomPlot").Include("FiefdomResources").FirstOrDefault();
  // 			bool canAfford = true;
  // 			foreach(var res in cost)
  // 			{
  // 				if(fief.FiefdomResources.Where(t => t.Type == res.Type).FirstOrDefault().Quantity < res.Quantity)
  // 				{
  // 					canAfford = false;
  // 				}
  // 			}
  //             //Subtract resources
  // 			if(canAfford == true)
  // 			{	
  // 				if(fief.FiefdomPlot[id].Type == "Empty")
  // 				{
  // 					fief.FiefdomPlot[id].Type = type;
  // 					foreach(var res in cost)
  // 					{
  // 						fief.FiefdomResources.Where(t => t.Type == res.Type).FirstOrDefault().Quantity -= res.Quantity;
  // 					}
  // 				}
  // 			}

  // 			db.SaveChanges();
  //         }
  //     }

  //     public static Fief GetFiefdomBySessionId(String SessionId)
  //     {
  //         using (var db = new FiefContext())
  //         {
  //             var fiefdom = db.Fiefdom.Where(f => f.SessionId == SessionId).Include("FiefdomPlot").Include("FiefdomResources").FirstOrDefault();
  //             return fiefdom;
  //         }
  //     }

  //     public static Fief GetFiefdomById(int Id)
  //     {
  //         using (var db = new FiefContext())
  //         {
  //             var fiefdom = db.Fiefdom.Where(f => f.Id == Id).Include("FiefdomPlot").Include("FiefdomResources").FirstOrDefault();
  //             return fiefdom;
  //         }
  //     }

  //     public static Fief GetFiefdomByUserName(string userName)
  //     {
  //         using (var db = new FiefContext())
  //         {
  //             var fiefdom = db.Fiefdom.Where(f => f.Name == userName).Include("FiefdomPlot").Include("FiefdomResources").FirstOrDefault();
  //             return fiefdom;
  //         }
  //     }

  // }
}