using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Results;
using NCMSystem.Filter;
using NCMSystem.Models;
using NCMSystem.Models.CallAPI;
using NCMSystem.Models.CallAPI.Team;
using Newtonsoft.Json;
using Serilog;

namespace NCMSystem.Controllers
{
    public class TeamController : ApiController
    {
        private NCMSystemEntities db = new NCMSystemEntities(Environment.GetEnvironmentVariable("NCMSystemEntities"));
        private LogException _log = new LogException();

        // GET: api/Team
        [HttpGet]
        [Route("api/team")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Marketer, NcmRole.Manager })]
        public ResponseMessageResult GetListMember()
        {
            int userId = ((JwtToken)Request.Properties["payload"]).Uid;

            List<TeamResponse> listMember = null;
            try
            {
                var mem = db.Database.SqlQuery<MemberTeam>("exec user_recurse @SuperBoss_id = " + userId).ToList();
                listMember = MemberRecursive(mem, userId);
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

        [HttpGet]
        [Route("api/team/{id}/contacts")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Marketer, NcmRole.Manager })]
        public ResponseMessageResult GetDetailMember(int id, int page = 1)
        {
            int pageSize = 10;
            if (page < 1) page = 1;
            List<MemberContact> listCt = new List<MemberContact>();
            try
            {
                var contact = db.contacts.Where(c => c.createdBy == id && c.isActive == true)
                    .OrderByDescending(x => x.create_date)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize).ToList();

                if (contact.Count != 0)
                {
                    foreach (var a in contact)
                    {
                        listCt.Add(new MemberContact()
                        {
                            Id = a.id,
                            Name = a.name,
                            ImgUrl = a.image_url,
                            JobTitle = a.job_title,
                            Company = a.company,
                            Status = a.status_id,
                            CreatedAt = a.create_date
                        });
                    }
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
                    Data = listCt
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpGet]
        [Route("api/team/search")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Marketer, NcmRole.Manager })]
        public ResponseMessageResult GetSearchMember(string value = "")
        {
            List<SearchResponse> listMember = new List<SearchResponse>();

            try
            {
                int userId = ((JwtToken)Request.Properties["payload"]).Uid;
                var mem = db.Database.SqlQuery<MemberTeam>("exec user_recurse @SuperBoss_id = " + userId).ToList();

                var memSearch = mem.Where(x => x.Name.Trim().ToLower().Contains(value.Trim().ToLower())).ToList();

                foreach (var a in memSearch)
                {
                    listMember.Add(new SearchResponse()
                    {
                        Id = a.Id,
                        Name = a.Name
                    });
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
    }
}