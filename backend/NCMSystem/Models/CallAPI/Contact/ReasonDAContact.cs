using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Contact
{
    public class ReasonDaContact
    {
        [JsonProperty("reason_da")]
        public string ReasonDa { get; set; }
    }
}