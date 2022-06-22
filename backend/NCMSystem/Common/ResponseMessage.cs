using System.Net.Http;
using System.Text;
using System.Web.Http.Results;
using NCMSystem.Models.CallAPI;
using Newtonsoft.Json;

namespace NCMSystem.Common
{
    public static class ResponseMessage
    {
        public static ResponseMessageResult BadRequest (string message)
        {
            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.BadRequest,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = message
                }), Encoding.UTF8, "application/json")
            });
        }
        
        public static ResponseMessageResult NotFound (string message)
        {
            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.NotFound,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = message
                }), Encoding.UTF8, "application/json")
            });
        }
    }
}