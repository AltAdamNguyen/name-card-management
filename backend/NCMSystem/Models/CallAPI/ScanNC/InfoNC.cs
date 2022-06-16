using System.Collections.Generic;
namespace NCMSystem.Models.CallAPI.ScanNC
{
    public class InfoNC
    {
        public string imgUrl { get; set; }
        public string email { get; set; }
        public string website { get; set; }
        public string mobile { get; set; }
        public string telephone { get; set; }
        public string fax { get; set; }
        public List<string> items { get; set; }
    }
}