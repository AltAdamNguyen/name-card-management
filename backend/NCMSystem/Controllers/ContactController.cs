using System.Web.Http;
using NCMSystem.Models.CallAPI.Contact;

namespace NCMSystem.Controllers
{
    public class ContactController : ApiController
    {
        // GET
        [HttpGet]
        [Route("api/contact/view")]
        public ContactResponse Get(ContactRequest request)
        {
            ContactResponse response = new ContactResponse();
            
            
            return response; 
        }
        
        // POST
        [HttpPost]
        [Route("api/contact/add")]
        public ContactResponse Post([FromBody] ContactRequest request)
        { 
            ContactResponse response = new ContactResponse();
            
            
            return response;
        }

        // PUT
        [HttpPut]
        [Route("api/contact/update")]
        public ContactResponse Put(int id, [FromBody] string value)
        {   
            ContactResponse response = new ContactResponse();
            
            
            return response;
        }

    }
}