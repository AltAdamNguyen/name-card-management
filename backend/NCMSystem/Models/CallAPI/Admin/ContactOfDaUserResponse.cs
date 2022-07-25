using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Admin
{
    public class ContactOfDaUserResponse
    {
        [JsonProperty("id")] public int Id { get; set; }
        [JsonProperty("name")] public string Name { get; set; }
        [JsonProperty("company")] public string Company { get; set; }
        [JsonProperty("active")] public bool IsActive { get; set; }
    }
}