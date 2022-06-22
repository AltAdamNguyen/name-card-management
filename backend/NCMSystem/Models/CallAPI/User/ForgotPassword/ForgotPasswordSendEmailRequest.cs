using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.User.ForgotPassword
{
    public class ForgotPasswordSendEmailRequest
    {
        [JsonProperty("email")]
        public string Email { get; set; }
    }
}