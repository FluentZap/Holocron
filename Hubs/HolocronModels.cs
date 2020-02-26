using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using Holocron.Context;

namespace Holocron.Hubs
{

  public class StandardCommand
  {
    [JsonProperty("sessionToken")]
    public string SessionToken { get; set; }
  }

  public class UserData
  {
    [JsonProperty("userName")]
    public string Name { get; set; }

    [JsonProperty("password")]
    public string Password { get; set; }

    [JsonProperty("sessionToken")]
    public string sessionToken { get; set; }
  }

  [JsonObject]
  public class CharacterData : Character
  {
    [JsonProperty("specializations")]
    public List<string> SpecializationsList { get; set; }
    [JsonProperty("skillsCareer")]
    public List<string> SkillsCareerList { get; set; }
    [JsonProperty("skillsCareerFree")]
    public List<string> SkillsCareerFreeList { get; set; }
    [JsonProperty("skillsSpec")]
    public List<string> SkillsSpecList { get; set; }
    [JsonProperty("skillsSpecFree")]
    public List<string> SkillsSpecFreeList { get; set; }
  }


  public class UpdateModel
  {

    public class UserModel
    {
      public string SessionToken { get; set; }
      public string Name { get; set; }
      public int? CurrentAdventure { get; set; }
    }


    public class CharacterModel
    {
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

      public List<string> Specializations { get; set; } = new List<string>();
      public int Soak { get; set; }

      public List<int> Groups { get; set; }

      public Characteristics Characteristics { get; set; }
      public Characteristics CharacteristicsBuy { get; set; }

      public List<string> SkillsCareer { get; set; }
      public List<string> SkillsCareerFree { get; set; }
      public List<string> SkillsSpec { get; set; }
      public List<string> SkillsSpecFree { get; set; }

      public Skills SkillsBuy { get; set; }
      public string Species { get; set; }

      public Dictionary<int, CharacterShipModel> Ships { get; set; } = new Dictionary<int, CharacterShipModel>();
      public Dictionary<int, CharacterInventoryModel> Inventory { get; set; } = new Dictionary<int, CharacterInventoryModel>();
    }

    public class CharacterListItem
    {
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

      public List<string> Specializations { get; set; } = new List<string>();
      public int Soak { get; set; }

      public List<int> Groups { get; set; }

      public Characteristics Characteristics { get; set; }
      public Characteristics CharacteristicsBuy { get; set; }

      public List<string> SkillsCareer { get; set; }
      public List<string> SkillsCareerFree { get; set; }
      public List<string> SkillsSpec { get; set; }
      public List<string> SkillsSpecFree { get; set; }

      public Skills SkillsBuy { get; set; }
      public string Species { get; set; }

      public Dictionary<int, CharacterShipModel> Ships { get; set; } = new Dictionary<int, CharacterShipModel>();
      public Dictionary<int, CharacterInventoryModel> Inventory { get; set; } = new Dictionary<int, CharacterInventoryModel>();
    }

    public class GroupModel
    {
      public string Name { get; set; }
      public string ConnectionId { get; set; }
      public Dictionary<int, string> Permissions { get; set; } = new Dictionary<int, string>();
      public List<int> Characters { get; set; } = new List<int>();
      public Dictionary<int, GroupShipModel> Ships { get; set; } = new Dictionary<int, GroupShipModel>();
      public Dictionary<int, GroupInventoryModel> Inventory { get; set; } = new Dictionary<int, GroupInventoryModel>();
    }

    public class CurrentAdventureModel
    {
      public string Name { get; set; }
      public string ConnectionId { get; set; }
      public Dictionary<int, string> Permissions { get; set; } = new Dictionary<int, string>();
      public List<CharacterModel> Characters { get; set; } = new List<CharacterModel>();
      public Dictionary<int, GroupShipModel> Ships { get; set; } = new Dictionary<int, GroupShipModel>();
      public Dictionary<int, GroupInventoryModel> Inventory { get; set; } = new Dictionary<int, GroupInventoryModel>();
    }

    public class GroupListItem
    {
      public int Id { get; set; }
      public string Name { get; set; }
      public string ConnectionId { get; set; }
      public int? Users { get; set; }
      public int? Characters { get; set; }
    }

    public class ItemModel
    {
      public string Location { get; set; }
      public string Name { get; set; }
    }

    public class ShipModel
    {
      public string Name { get; set; }
    }

    public class GroupShipModel : ShipModel { }
    public class CharacterShipModel : ShipModel { }

    public class GroupInventoryModel : ItemModel { }
    public class CharacterInventoryModel : ItemModel { }

    public UserModel User;
    public Dictionary<int, CharacterModel> Characters { get; set; } = new Dictionary<int, CharacterModel>();
    public Dictionary<int, GroupModel> Groups { get; set; } = new Dictionary<int, GroupModel>();
    public Dictionary<int, GroupListItem> GroupList { get; set; } = new Dictionary<int, GroupListItem>();
    public CurrentAdventureModel CurrentAdventure { get; set; }

    public void AddCharacter(Character character)
    {
      Characters[character.Id] = _ParseCharacter(character);
    }

    public void AddCharacters(List<Character> characters)
    {
      foreach (var character in characters)
      {
        Characters[character.Id] = _ParseCharacter(character);
      }
    }

    CharacterModel _ParseCharacter(Character character)
    {
      return new CharacterModel()
      {
        Name = character.Name,
        Credits = character.Credits,
        Career = character.Career,
        FreeCareerRanks = character.FreeCareerRanks,
        FreeSpecRanks = character.FreeSpecRanks,
        Wound = character.Wound,
        WoundThreshold = character.WoundThreshold,
        Strain = character.Strain,
        StrainThreshold = character.StrainThreshold,
        Xp = character.Xp,
        UnusedXp = character.UnusedXp,
        Specializations = new List<string>(character.Specializations.Split(',')),
        Soak = character.Soak,
        Groups = character.GroupCharacters?.Select(x => x.GroupId).ToList(),
        Characteristics = character.Characteristics,
        CharacteristicsBuy = character.CharacteristicsBuy,
        SkillsCareer = new List<string>(character.SkillsCareer.Split(',')),
        SkillsCareerFree = new List<string>(character.SkillsCareerFree.Split(',')),
        SkillsSpec = new List<string>(character.SkillsSpec.Split(',')),
        SkillsSpecFree = new List<string>(character.SkillsSpecFree.Split(',')),
        SkillsBuy = character.SkillsBuy,
        Species = character.Species,
        Ships = character.Ships?.ToDictionary(x => x.Id, x => new CharacterShipModel() { Name = x.Name }),
        Inventory = character.Inventory?.ToDictionary(x => x.Id, x => new CharacterInventoryModel()
        {
          Name = x.Name,
          Location = x.Location,
        }),
      };
    }

    public void AddGroup(Group group)
    {
      _AddGroup(group);
    }

    public void AddGroups(List<Group> groups)
    {
      foreach (var group in groups)
      {
        _AddGroup(group);
      }
    }

    void _AddGroup(Group group)
    {
      Groups[group.Id] = new GroupModel()
      {
        ConnectionId = group.ConnectionId,
        Name = group.Name,
        Permissions = group.Permissions?.ToDictionary(x => x.User.Id, x => x.PermissionGroup),
        Characters = group.GroupCharacters?.Select(x => x.Character.Id).ToList() ?? new List<int>(),
        Ships = group.Ships?.ToDictionary(x => x.Id, x => new GroupShipModel() { Name = x.Name }),
        Inventory = group.Inventory?.ToDictionary(x => x.Id, x => new GroupInventoryModel()
        {
          Name = x.Name,
          Location = x.Location
        }),
      };
    }

    public void AddGroupList(List<Group> groups)
    {
      foreach (var group in groups)
      {
        _AddGroupListItem(group);
      }
    }

    public void AddGroupList(Group group)
    {
      _AddGroupListItem(group);
    }

    void _AddGroupListItem(Group group)
    {
      GroupList[group.Id] = new GroupListItem()
      {
        Id = group.Id,
        ConnectionId = group.ConnectionId,
        Name = group.Name,
        Users = group.Permissions?.Count,
        Characters = group.GroupCharacters?.Count
      };
    }

    public void AddUser(User user)
    {
      this.User = new UserModel
      {
        CurrentAdventure = user?.CurrentAdventureId,
        SessionToken = user?.SessionToken,
        Name = user?.Name,
      };
    }

    public void AddAdventure(Group group)
    {
      List<CharacterModel> adventure_characters = new List<CharacterModel>();
      foreach (var character in group.GroupCharacters?.Select(x => x.Character))
      {
        adventure_characters[character.Id] = _ParseCharacter(character);
      }
      CurrentAdventure = new CurrentAdventureModel()
      {
        ConnectionId = group.ConnectionId,
        Name = group.Name,
        Permissions = group.Permissions?.ToDictionary(x => x.User.Id, x => x.PermissionGroup),
        Characters = adventure_characters,
        Ships = group.Ships?.ToDictionary(x => x.Id, x => new GroupShipModel() { Name = x.Name }),
        Inventory = group.Inventory?.ToDictionary(x => x.Id, x => new GroupInventoryModel()
        {
          Name = x.Name,
          Location = x.Location
        }),
      };
    }

  }





}