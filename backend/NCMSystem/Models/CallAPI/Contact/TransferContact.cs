using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Contact
{
    public class TransferContact
    {
        [JsonProperty("from")] public string TransferFrom { get; set; }
        [JsonProperty("contact_id")] public string[] ContactIds { get; set; }
        [JsonProperty("to")] public string TransferTo { get; set; }
    }
}