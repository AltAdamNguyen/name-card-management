using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Contact
{
    public class StatusContact
    {
        [JsonProperty("status")] public string Status { get; set; }
        [JsonProperty("reason_status")] public string ReasonStatus { get; set; }
    }
}