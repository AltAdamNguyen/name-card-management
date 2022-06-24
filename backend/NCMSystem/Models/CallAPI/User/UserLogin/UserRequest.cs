using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.User.UserLogin
{
    public class UserRequest
    {
        [JsonProperty("email")]
        public string Email { get; set; }
        
        [JsonProperty("password")]
        public string Password { get; set; }
    }
}