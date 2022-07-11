using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Contact
{
    public class TransferContact
    {
        [JsonProperty("contact_id")] public string[] ContactIds { get; set; }
        [JsonProperty("email")] public string TransferTo { get; set; }
    }
}