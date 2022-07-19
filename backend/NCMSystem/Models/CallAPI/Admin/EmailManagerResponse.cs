using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Admin
{
    public class EmailManagerResponse
    {
        [JsonProperty("id")] public int Id { get; set; }
        [JsonProperty("email")] public string Email { get; set; }
    }
}