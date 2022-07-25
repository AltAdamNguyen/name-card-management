using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NCMSystem.Models.CallAPI.Group_Contact
{
    public class ContactToGroupRequest
    {
        [JsonProperty("user_id")] public string UserId { get; set; }
        [JsonProperty("contact_ids")] public List<ContactIdsRequest> ContactIds { get; set; }
        [JsonProperty("group_ids")] public List<GroupIdsRequest> GroupIds { get; set; }
    }
}