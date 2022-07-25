using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NCMSystem.Models.CallAPI.Group_Contact
{
    public class HomeGroupContact
    {
        [JsonProperty("group_name")] public string GroupName { get; set; }
        [JsonProperty("group_id")] public int GroupId { get; set; }
    }
}