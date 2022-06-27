using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using NCMSystem.Filter;
using Serilog;
using NCMSystem.Models;

namespace NCMSystem.Controllers
{
    public class TestController : ApiController
    {
        private NCMSystemEntities db = new NCMSystemEntities();
        private LogException _log = new LogException();

        [HttpGet]
        [Route("api/test")]
        public ResponseMessageResult PatchFlag()
        {
            try
            {
                var selectGroup = db.groups.FirstOrDefault(x => x.id == 99999);
                var selectContact = db.contacts.FirstOrDefault(x => x.id == 6);

                selectGroup.contacts.Add(selectContact);

                db.SaveChanges();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Something went wrong");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(Request.CreateResponse(HttpStatusCode.OK));
        }
    }
}