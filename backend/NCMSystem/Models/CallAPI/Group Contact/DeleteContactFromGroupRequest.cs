using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NCMSystem.Models.CallAPI.Group_Contact
{
    public class DeleteContactFromGroupRequest
    {
        [JsonProperty("group_id")] public int GroupId { get; set; }
        [JsonProperty("contact_ids")] public List<DeleteContactIdFromGroupRequest> ContactIds { get; set; }
    }
}