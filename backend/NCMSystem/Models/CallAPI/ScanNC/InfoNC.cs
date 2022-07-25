using System.Collections.Generic;
using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.ScanNC
{
    public class InfoNC
    {
        [JsonProperty("img_url")]
        public string ImgUrl { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("website")]
        public string Website { get; set; }
        [JsonProperty("phone")]
        public string Phone { get; set; }
        [JsonProperty("fax")]
        public string Fax { get; set; }
        public List<string> Items { get; set; }
    }
}