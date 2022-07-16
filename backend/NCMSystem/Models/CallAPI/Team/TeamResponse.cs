using System.Collections.Generic;
using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Team
{
    public class TeamResponse
    {
        [JsonProperty("id")] public int Id { get; set; }
        [JsonProperty("name")] public string Name { get; set; }
        [JsonProperty("email")] public string Email { get; set; }
        [JsonProperty("role_id")] public int Role { get; set; }
        [JsonProperty("isActive")] public bool IsActive { get; set; }
        [JsonProperty("children")] public List<TeamResponse> Children { get; set; }
    }
}