using System;
using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Contact
{
    public class DetailContact
    {
        [JsonProperty("id")] public int Id { get; set; }
        [JsonProperty("img_url")] public string ImgUrl { get; set; }
        [JsonProperty("name")] public string Name { get; set; }
        [JsonProperty("job_title")] public string JobTitle { get; set; }
        [JsonProperty("company")] public string Company { get; set; }
        [JsonProperty("flag")] public string Flag { get; set; }
        [JsonProperty("phone")] public string Phone { get; set; }
        [JsonProperty("fax")] public string Fax { get; set; }
        [JsonProperty("email")] public string Email { get; set; }
        [JsonProperty("address")] public string Address { get; set; }
        [JsonProperty("website")] public string Website { get; set; }
        [JsonProperty("group_name")] public string[] GroupName { get; set; }
        [JsonProperty("status")] public string Status { get; set; }
        [JsonProperty("status_reason")] public string ReasonStatus { get; set; }
        [JsonProperty("created_at")] public DateTime CreatedAt { get; set; }
    }
}