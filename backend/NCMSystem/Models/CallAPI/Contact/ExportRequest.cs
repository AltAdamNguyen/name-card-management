using Newtonsoft.Json;

namespace NCMSystem.Models.CallAPI.Contact
{
    public class ExportRequest
    {
        [JsonProperty("array_id")] public int[] ArrayId { get; set; }
    }
}