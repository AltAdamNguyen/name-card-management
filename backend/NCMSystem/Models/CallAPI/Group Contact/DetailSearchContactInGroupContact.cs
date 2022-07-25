using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NCMSystem.Models.CallAPI.Group_Contact
{
    public class DetailSearchContactInGroupContact
    {
        [JsonProperty("group_name")] public string GroupName { get; set; }
        [JsonProperty("contacts")] public List<ContactInGroup> contacts { get; set; }
    }
}