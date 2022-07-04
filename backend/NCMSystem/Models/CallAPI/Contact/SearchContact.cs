using System;
using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Contact
{
    public class SearchContact
    {
        [JsonProperty("id")] public int Id { get; set; }
        [JsonProperty("img_url")] public string ImgUrl { get; set; }
        [JsonProperty("name")] public string Name { get; set; }
        [JsonProperty("job_title")] public string JobTitle { get; set; }
        [JsonProperty("company")] public string Company { get; set; }
        [JsonProperty("email")] public string Email { get; set; }
        [JsonProperty("status_id")] public string Status { get; set; }
        [JsonProperty("flag_id")] public string Flag { get; set; }
        [JsonProperty("created_at")] public DateTime CreatedAt { get; set; }
    }
}