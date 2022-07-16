using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Admin
{
    public class ImportedUser
    {
        [JsonProperty("name")] public string Name { get; set; }
        [JsonProperty("email")] public string Email { get; set; }
        [JsonProperty("role_id")] public int? Role { get; set; }
        [JsonProperty("manager")] public string Manager { get; set; }
    }
}