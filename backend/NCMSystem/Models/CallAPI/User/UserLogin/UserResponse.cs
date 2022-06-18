using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.User.UserLogin
{
    public class UserResponse
    {
        [JsonProperty("message")]
        public string Message { get; set; }
        
        [JsonProperty("data")]
        public UserToken Data { get; set; }
    }
}