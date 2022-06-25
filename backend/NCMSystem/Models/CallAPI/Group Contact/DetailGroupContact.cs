using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Group_Contact
{
    public class DetailGroupContact
    {
        [JsonProperty("name")] public string GroupName { get; set; }
        [JsonProperty("contact")] public List<contact> contacts { get; set; }
    }
}