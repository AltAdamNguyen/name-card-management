using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Results;
using NCMSystem.Filter;

using NCMSystem.Models;
using NCMSystem.Models.CallAPI;
using Newtonsoft.Json;

namespace NCMSystem.Controllers
{
    public class TestController : ApiController
    {
        private NCMSystemEntities db = new NCMSystemEntities();
        private LogException _log = new LogException();

        [HttpGet]
        [Route("api/test")]
        public ResponseMessageResult PatchFlag(string name)
        {
            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
                    Data = new
                    {
                        name
                    }
                }), Encoding.UTF8, "application/json")
            });
        }
    }
}