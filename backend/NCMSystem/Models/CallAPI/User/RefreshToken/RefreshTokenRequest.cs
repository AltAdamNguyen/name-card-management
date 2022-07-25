using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.User.RefreshToken
{
    public class RefreshTokenRequest
    {
        [JsonProperty("refresh_token")]
        public string RefreshToken { get; set; }
    }
}