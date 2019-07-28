using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Holocron.Context
{


    public class TokenReturn
    {
        public Guid SessionToken;
        public bool LoggedIn = false;        
    }

    public static class HoloData
    {
        public static async Task CreateUser(User user)
        {
            using (var db = new HolocronContext())
            {
                await db.Users.AddAsync(user);
                await db.SaveChangesAsync();
            }            
        }

        


        public static async Task<TokenReturn> LoginUser(User user)
        {
            using (var db = new HolocronContext())
            {
                User dataUser = await db.Users.Where(x => x.Name == user.Name).FirstOrDefaultAsync();
                if (dataUser != null && dataUser.Password == user.Password) {
                    Guid g = Guid.NewGuid();
                    dataUser.SessionToken = g.ToString();
                    await db.SaveChangesAsync();
                    return new TokenReturn(){SessionToken = g, LoggedIn = true};
                }
                return new TokenReturn();
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