using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Contact
{
    public class ContactRequest
    {
        [JsonProperty("img_url")]
        public string ImgUrl { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("job_title")]
        public string JobTitle { get; set; }
        [JsonProperty("company")]
        public string Company { get; set; }
        [JsonProperty("phone")]
        public string Phone { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("address")]
        public string Address { get; set; }
        [JsonProperty("website")]
        public string Website { get; set; }
        [JsonProperty("fax")]
        public string Fax { get; set; }
    }
}