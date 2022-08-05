using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NCMSystem.Models.CallAPI.Group_Contact
{
    public class ContactInGroup
    {
        [JsonProperty("contact_id")] public int ContactId { get; set; }
        [JsonProperty("contact_name")] public string ContactName { get; set; }
        [JsonProperty("contact_imgurl")] public string ImgUrl { get; set; }
        [JsonProperty("contact_jobtitle")] public string JobTitle { get; set; }
        [JsonProperty("contact_company")] public string ContactCompany { get; set; }
        [JsonProperty("contact_phone")] public string ContactPhone { get; set; }
        [JsonProperty("contact_createdat")] public DateTime ContactCreatedAt { get; set; }
    }
}