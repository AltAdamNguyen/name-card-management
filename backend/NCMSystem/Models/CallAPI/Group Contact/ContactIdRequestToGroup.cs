using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NCMSystem.Models.CallAPI.Group_Contact
{
    public class ContactIdRequestToGroup
    {
        [JsonProperty("contact_id")] public int ContactId { get; set; }
    }
}