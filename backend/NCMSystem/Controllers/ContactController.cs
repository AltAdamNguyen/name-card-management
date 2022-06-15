using System.Web.Http;
using NCMSystem.Models.CallAPI.Contacts;

namespace NCMSystem.Controllers
{
    public class ContactController : ApiController
    {
        // GET
        [HttpGet]
        [Route("api/contact/view")]
        public ContactsResponse Get(ContactsRequest request)
        {
            ContactsResponse response = new ContactsResponse();
            
            
            return response; 
        }
        
        // POST
        [HttpPost]
        [Route("api/contact/add")]
        public ContactsResponse Post([FromBody] ContactsRequest request)
        { 
            ContactsResponse response = new ContactsResponse();
            
            
            return response;
        }

        // PUT
        [HttpPut]
        [Route("api/contact/update")]
        public ContactsResponse Put(int id, [FromBody] string value)
        {   
            ContactsResponse response = new ContactsResponse();
            
            
            return response;
        }

    }
}