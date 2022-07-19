using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Admin
{
    public class ChangeUserImportedRequest
    {
        [JsonProperty("name")] public string Name { get; set; }
        [JsonProperty("email")] public string Email { get; set; }
        [JsonProperty("role_id")] public int RoleId { get; set; }
        [JsonProperty("manager_email")] public string Manager { get; set; }
    }
}