using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NCMSystem.Models.CallAPI.Group_Contact
{
    public class MemberTeamGroupContact
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int RoleId { get; set; }
        public int? ManagerId { get; set; }
    }
}