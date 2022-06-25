using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using NCMSystem.Models;

namespace NCMSystem.Controllers
{
    public class TestController : ApiController
    {
        private NCMSystemEntities db = new NCMSystemEntities();

        // PATCH
        [HttpGet]
        [Route("api/test")]
        public ResponseMessageResult PatchFlag()
        {
            var selectGroup = db.groups.FirstOrDefault(x => x.id == 2);
            var selectContact = db.contacts.FirstOrDefault(x => x.id == 6);

            selectGroup.contacts.Add(selectContact);
            
            db.SaveChanges();


            return new ResponseMessageResult(Request.CreateResponse(HttpStatusCode.OK));
        }
    }
}