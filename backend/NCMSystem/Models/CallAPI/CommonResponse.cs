using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI
{
    public class CommonResponse
    {
        [JsonProperty("message")]
        public string Message { get; set; }
        
        [JsonProperty("data")]
        public object Data { get; set; }
    }
}