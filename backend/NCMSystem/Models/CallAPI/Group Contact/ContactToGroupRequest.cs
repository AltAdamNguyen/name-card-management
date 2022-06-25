using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NCMSystem.Models.CallAPI.Group_Contact
{
    public class ContactToGroupRequest
    {
        public int GroupId { get; set; }
        public int ContactId { get; set; }
    }
}