using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.User.UserLogin
{
    public class UserToken
    {
        [JsonProperty("access_token")]
        public string Token { get; set; }
        
        [JsonProperty("refresh_token")]
        public string RefreshToken { get; set; }
    }
}