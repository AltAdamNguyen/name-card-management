using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Contact
{
    public class FlagContact
    {
        [JsonProperty("flag")] public string Flag { get; set; }
    }
}