using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Contact
{
    public class OwnerContact
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        
        [JsonProperty("id_duplicate")]
        public int IdDuplicate { get; set; }
        
        [JsonProperty("user_name")]
        public string Owner { get; set; }
    }
}