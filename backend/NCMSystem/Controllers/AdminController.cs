using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using ExcelDataReader;
using NCMSystem.Models.CallAPI;
using Newtonsoft.Json;

namespace NCMSystem.Controllers
{
    public class AdminController : ApiController
    {
        [HttpPost]
        [Route("api/admin/staff")]
        // [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Admin })]
        public ResponseMessageResult AddStaff()
        {
            var temp = HttpContext.Current.Request.Files[0];
            if (temp == null || temp.ContentLength == 0)
            {
                return Common.ResponseMessage.BadRequest("A0001");
            }

            long timeStart = DateTime.Now.Ticks;
            string fileName = AppDomain.CurrentDomain.BaseDirectory + "Files\\staff_" + timeStart + ".xlsx";
            temp.SaveAs(fileName);

            var stream = File.Open(fileName, FileMode.Open, FileAccess.Read);
            var reader = ExcelReaderFactory.CreateReader(stream);
            
            if (reader == null)
            {
                return Common.ResponseMessage.BadRequest("A0002");
            }
            
            while (reader.Read())
            {
                for (int column = 0; column < reader.FieldCount; column++)
                {
                    //Console.WriteLine(reader.GetString(column));//Will blow up if the value is decimal etc. 
                    Console.WriteLine(reader.GetValue(column));//Get Value returns object
                }
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
                }), Encoding.UTF8, "application/json")
            });
        }
    }
}