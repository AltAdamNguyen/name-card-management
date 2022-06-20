using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.User.ChangePassword
{
    public class ChangePasswordRequest
    {
        [JsonProperty("old_password")]
        public string OldPassword { get; set; }
        
        [JsonProperty("new_password")]
        public string NewPassword { get; set; }
    }
}