using System;
using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Admin
{
    public class UserInformationImportedResponse
    {
        [JsonProperty("id")] public int Id { get; set; }
        [JsonProperty("name")] public string Name { get; set; }
        [JsonProperty("email")] public string Email { get; set; }
        [JsonProperty("role_id")] public int? RoleId { get; set; }
        [JsonProperty("manager")] public string EmailManager { get; set; }
    }
}