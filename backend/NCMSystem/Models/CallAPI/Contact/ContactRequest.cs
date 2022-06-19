namespace NCMSystem.Models.CallAPI.Contact
{
    public class ContactRequest
    {
        public string imgUrl { get; set; }
        public string name { get; set; }
        public string job_title { get; set; }
        public string company { get; set; }
        public string mobile { get; set; }
        public string email { get; set; }
        public string address { get; set; }
        public string website { get; set; }
        public string fax { get; set; }
    }
}