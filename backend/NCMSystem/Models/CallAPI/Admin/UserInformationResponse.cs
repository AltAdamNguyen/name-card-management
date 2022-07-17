using System;
using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Admin
{
    public class UserInformationResponse
    {
        [JsonProperty("id")] public int UserId { get; set; }
        [JsonProperty("name")] public string Name { get; set; }
        [JsonProperty("email")] public string Email { get; set; }
        [JsonProperty("is_active")] public bool? IsActive { get; set; }
        [JsonProperty("role_id")] public int RoleId { get; set; }
        [JsonProperty("id_manager")] public int? IdManager { get; set; }
        [JsonProperty("email_manager")] public string EmailManager { get; set; }
    }
}