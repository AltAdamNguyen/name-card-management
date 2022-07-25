using Newtonsoft.Json;

namespace NCMSystem.Filter
{
    public class JwtToken
    {
        [JsonProperty("uid")] public int Uid { get; set; }
        [JsonProperty("iat")] public long Iat { get; set; }
        [JsonProperty("exp")] public long Exp { get; set; }
    }
}