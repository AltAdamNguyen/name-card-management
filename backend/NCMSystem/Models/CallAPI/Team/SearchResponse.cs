using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Team
{
    public class SearchResponse
    {
        [JsonProperty("id")] public int Id { get; set; }
        [JsonProperty("name")] public string Name { get; set; }
        [JsonProperty("email")] public string Email { get; set; }
    }
}