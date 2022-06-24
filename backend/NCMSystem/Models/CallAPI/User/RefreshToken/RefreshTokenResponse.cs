using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.User.RefreshToken
{
    public class RefreshTokenResponse
    {
        [JsonProperty("access_token")]
        public string Token { get; set; }
    }
}