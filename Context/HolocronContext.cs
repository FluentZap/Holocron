using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Holocron.Context
{

    public class HolocronContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseMySQL("server=localhost;database=holocron;user=root;password=root;port=3306;");
		}

    }

    public class User
    {
        public int Id { get; set; }
        public string SessionToken { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public List<Character> Characters { get; set; } = new List<Character>();
        public List<Group> Groups { get; set; } = new List<Group>();
    }

    public class Group
    {
        public int Id { get; set; }
        public int Name { get; set; }
        public string ConnectionId { get; set; }
        public List<Character> Characters = new List<Character>();
    }
    
    public class Character
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int Wound { get; set; }
        public int WoundThreashold { get; set; }

        public int Strain { get; set; }
        public int StrainThreashold { get; set; }

        public int Xp { get; set; }
        public int Credits { get; set; }

        public string Career { get; set; }
        public string Specializations { get; set; }

        public int Brawn { get; set; }
        public int Agility { get; set; }
        public int Intelect { get; set; }
        public int Cunning { get; set; }
        public int Willpower { get; set; }
        public int Presence { get; set; }
        public List<Item> Inventory { get; set; } = new List<Item>();

    }

    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class Ship
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

}