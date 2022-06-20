using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.User.ForgotPassword
{
    public class ForgotPasswordSubmitRequest
    {
        [JsonProperty("email")]
        public string Email { get; set; }
        
        [JsonProperty("code")]
        public string Code { get; set; }
        
        [JsonProperty("password")]
        public string Password { get; set; }
    }
}