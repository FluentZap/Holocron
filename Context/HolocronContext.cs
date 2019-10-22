using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Holocron.Context
{

  public class HolocronContext : DbContext
  {
    public DbSet<User> Users { get; set; }
    public DbSet<Character> Characters { get; set; }
    public DbSet<Group> Groups { get; set; }
    public DbSet<GroupCharacter> GroupCharacters { get; set; }    
    public DbSet<Permission> Permissions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      // optionsBuilder.UseMySQL("server=localhost;database=holocron;user=holocron;password=digi;port=3306;");
      optionsBuilder.UseMySQL("server=localhost;database=holocron;user=holocron;password=digi;port=3306;");
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);
      builder.Entity<GroupCharacter>().HasKey(x => new { x.GroupId, x.CharacterId });      
    }

  }

  public class User
  {
    public int Id { get; set; }
    public string SessionToken { get; set; }
    public string Name { get; set; }
    public string Password { get; set; }    
    public List<Character> Characters { get; set; } = new List<Character>();
  }

  [JsonObject]
  public class Group
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string ConnectionId { get; set; }
    public List<Permission> Permissions { get; set; } = new List<Permission>();
    public ICollection<GroupCharacter> GroupCharacters { get; set; }    
    public List<GroupShip> Ships { get; set; } = new List<GroupShip>();
    public List<GroupInventory> Inventory { get; set; } = new List<GroupInventory>();
  }

  public class GroupCharacter
  {
    public int GroupId { get; set; }
    public Group Group { get; set; }

    public int CharacterId { get; set; }
    public Character Character { get; set; }
  }

  public class Permission
  {
    public int Id { get; set; }
    public Group Group { get; set; }
    public User User { get; set; }
    public string PermissionGroup { get; set; }
  }

  [JsonObject]
  public class Character
  {
    public int Id { get; set; }

    public string Name { get; set; }
    public int Credits { get; set; }
    public string Career { get; set; }
    public int FreeCareerRanks { get; set; }
    public int FreeSpecRanks { get; set; }
    public int Wound { get; set; }
    public int WoundThreshold { get; set; }
    public int Strain { get; set; }
    public int StrainThreshold { get; set; }
    public int Xp { get; set; }
    public int UnusedXp { get; set; }

    public string Specializations { get; set; }

    public ICollection<GroupCharacter> GroupCharacters { get; set; }

    public Characteristics Characteristics { get; set; }
    public Characteristics CharacteristicsBuy { get; set; }
    public int Soak { get; set; }

    public string SkillsCareer { get; set; }
    public string SkillsCareerFree { get; set; }
    public string SkillsSpec { get; set; }
    public string SkillsSpecFree { get; set; }

    public Skills SkillsBuy { get; set; }
    public string Species { get; set; }

    public List<CharacterInventory> Inventory { get; set; } = new List<CharacterInventory>();
    public List<CharacterShip> Ships { get; set; } = new List<CharacterShip>();
  }

  [JsonObject]
  public class Characteristics
  {
    public int Id { get; set; }
    public int BR { get; set; }
    public int AG { get; set; }
    public int INT { get; set; }
    public int CUN { get; set; }
    public int WIL { get; set; }
    public int PR { get; set; }
  }

  [JsonObject]
  public class Skills
  {
    public int Id { get; set; }
    public int ASTRO { get; set; }
    public int ATHL { get; set; }
    public int BRAWL { get; set; }
    public int CHARM { get; set; }
    public int COERC { get; set; }
    public int COMP { get; set; }
    public int COOL { get; set; }
    public int COORD { get; set; }
    public int CORE { get; set; }
    public int CYBERNETICS { get; set; }
    public int DECEP { get; set; }
    public int DISC { get; set; }
    public int EDU { get; set; }
    public int GUNN { get; set; }
    public int LEAD { get; set; }
    public int LORE { get; set; }
    public int LTSABER { get; set; }
    public int MECH { get; set; }
    public int MED { get; set; }
    public int MELEE { get; set; }
    public int NEG { get; set; }
    public int OUT { get; set; }
    public int PERC { get; set; }
    public int PILOTPL { get; set; }
    public int PILOTSP { get; set; }
    public int RANGHVY { get; set; }
    public int RANGLT { get; set; }
    public int RESIL { get; set; }
    public int SKUL { get; set; }
    public int STEAL { get; set; }
    public int SURV { get; set; }
    public int SW { get; set; }
    public int UND { get; set; }
    public int VIGIL { get; set; }
    public int WARF { get; set; }
    public int XEN { get; set; }
  }




  public class Item
  {
    public int Id { get; set; }
    public string Location { get; set; }
    public string Name { get; set; }
  }


  public class Ship
  {
    public int Id { get; set; }
    public string Name { get; set; }
  }

  public class GroupShip : Ship { }
  public class CharacterShip : Ship { }

  public class GroupInventory : Item { }
  public class CharacterInventory : Item { }

}