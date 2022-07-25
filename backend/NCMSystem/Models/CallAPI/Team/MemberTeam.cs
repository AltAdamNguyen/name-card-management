using System.Collections.Generic;
using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Team
{
    public class MemberTeam
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        public int RoleId { get; set; }
        public int? ManagerId { get; set; }
    }
}