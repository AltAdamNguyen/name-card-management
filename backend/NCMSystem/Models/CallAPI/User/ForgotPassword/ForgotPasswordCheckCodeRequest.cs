using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.User.ForgotPassword
{
    public class ForgotPasswordCheckCodeRequest
    {
        [JsonProperty("email")]
        public string Email { get; set; }
        
        [JsonProperty("code")]
        public string Code { get; set; }
    }
}