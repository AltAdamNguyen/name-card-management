using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using ExcelDataReader;
using NCMSystem.Filter;
using NCMSystem.Models;
using NCMSystem.Models.CallAPI;
using NCMSystem.Models.CallAPI.Admin;
using NCMSystem.Models.CallAPI.Team;
using Newtonsoft.Json;
using Serilog;

namespace NCMSystem.Controllers
{
    public class AdminController : ApiController
    {
        private NCMSystemEntities db = new NCMSystemEntities(Environment.GetEnvironmentVariable("NCMSystemEntities"));
        private LogException _log = new LogException();

        [HttpGet]
        [Route("api/admin/team")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Admin })]
        public ResponseMessageResult GetListMember(int id = 0)
        {
            if (id < 0) id = 0;
            List<TeamResponse> listMember = new List<TeamResponse>();
            try
            {
                var user = id == 0
                    ? db.users.FirstOrDefault(x => x.role_id == 3)
                    : db.users.FirstOrDefault(x => x.id == id);
                int userId = user?.id ?? 0;
                var mem = id == 0
                    ? db.Database.SqlQuery<MemberTeam>("exec user_recurse @SuperBoss_id = " + userId).ToList()
                    : db.Database.SqlQuery<MemberTeam>("exec user_recurse @SuperBoss_id = " + id).ToList();

                listMember.Add(new TeamResponse()
                {
                    Id = user?.id ?? 0,
                    Name = user?.name ?? "",
                    Email = user?.email ?? "",
                    Children = new List<TeamResponse>()
                });
                foreach (var a in listMember)
                {
                    a.Children = MemberRecursive(mem, userId);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
                    Data = listMember
                }), Encoding.UTF8, "application/json")
            });
        }

        public List<TeamResponse> MemberRecursive(List<MemberTeam> mem, int id)
        {
            List<TeamResponse> arrayChild = new List<TeamResponse>();

            foreach (var a in mem)
            {
                if (a.ManagerId == id)
                {
                    arrayChild.Add(new TeamResponse()
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Email = a.Email,
                        Children = new List<TeamResponse>()
                    });
                }
            }

            if (arrayChild.Count != 0)
            {
                foreach (var a in arrayChild)
                {
                    a.Children = MemberRecursive(mem, a.Id);
                }
            }

            return arrayChild;
        }


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

            var boss = db.users.FirstOrDefault(x => x.role_id == 3);

            reader.Read();

            while (reader.Read())
            {
                Staff staff = new Staff();
                for (int column = 0; column < reader.FieldCount; column++)
                {
                    switch (column)
                    {
                        case 0:
                            staff.Name = reader.GetString(column);
                            break;
                        case 1:
                            staff.Email = reader.GetString(column);
                            break;
                        case 2:
                            switch (reader.GetString(column))
                            {
                                case "Staff":
                                    staff.Role = 1;
                                    break;
                                case "Manager":
                                    staff.Role = 2;
                                    break;
                                case "Sale Director":
                                    if (boss != null)
                                    {
                                        staff.Role = 3;
                                    }

                                    staff.Role = 3;
                                    break;
                            }

                            break;
                    }

                    Console.WriteLine(reader.GetString(column));
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