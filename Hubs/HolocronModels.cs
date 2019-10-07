using System.Collections.Generic;
using Newtonsoft.Json;
using Holocron.Context;

namespace Holocron.Hubs
{

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

}