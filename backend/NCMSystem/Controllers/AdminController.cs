using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using ClosedXML.Excel;
using ExcelDataReader;
using NCMSystem.Filter;
using NCMSystem.Models;
using NCMSystem.Models.CallAPI;
using NCMSystem.Models.CallAPI.Admin;
using NCMSystem.Models.CallAPI.Contact;
using NCMSystem.Models.CallAPI.Team;
using Newtonsoft.Json;
using Serilog;

namespace NCMSystem.Controllers
{
    [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Admin })]
    public class AdminController : ApiController
    {
        private NCMSystemEntities db = new NCMSystemEntities(Environment.GetEnvironmentVariable("NCMSystemEntities"));
        private LogException _log = new LogException();

        [HttpGet]
        [Route("api/admin/team")]
        public ResponseMessageResult GetListMember(int id = 0)
        {
            if (id < 0) id = 0;
            List<TeamResponse> listMember = new List<TeamResponse>();
            try
            {
                var user = id == 0
                    ? db.users.FirstOrDefault(x => x.role_id == 3 && x.isActive == true)
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
                    IsActive = user?.isActive ?? false,
                    Role = user?.role_id ?? 0,
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
                return Common.ResponseMessage.BadRequest("C0001");
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
                        Role = a.RoleId,
                        IsActive = a.IsActive,
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
        [Route("api/admin/import")]
        public ResponseMessageResult ImportData()
        {
            try
            {
                db.import_user.RemoveRange(db.import_user);
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

                reader.Read();
                reader.Read();

                while (reader.Read())
                {
                    if (reader.GetValue(1) == null)
                        break;

                    var name = "";
                    var email = "";
                    var emailMana = "";
                    int role = 0;
                    for (int column = 1; column < 5; column++)
                    {
                        switch (column)
                        {
                            case 1:
                                name = reader.GetString(column);
                                break;
                            case 2:
                                email = reader.GetString(column);
                                break;
                            case 3:
                                switch (reader.GetValue(column))
                                {
                                    case "Staff":
                                        role = 1;
                                        break;
                                    case "Manager":
                                        role = 2;
                                        break;
                                    case "Sale Director":
                                        role = 3;
                                        break;
                                }

                                break;
                            case 4:
                                emailMana = reader.GetString(column);
                                break;
                        }
                    }

                    db.import_user.Add(new import_user()
                    {
                        name = name,
                        email = email,
                        role_id = role,
                        manager = emailMana,
                        status = 1
                    });
                }

                db.SaveChanges();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
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

        [HttpGet]
        [Route("api/admin/list-email-manager")]
        public ResponseMessageResult GetListEmailManager()
        {
            var listEmail = new List<EmailManagerResponse>();

            try
            {
                var saleDirector = db.users.FirstOrDefault(x => x.role_id == 3 && x.isActive == true);
                if (saleDirector != null)
                {
                    listEmail.Add(new EmailManagerResponse()
                    {
                        Id = saleDirector.id,
                        Email = saleDirector.email,
                    });
                }

                db.users.Where(x => x.role_id == 2 && x.isActive == true).ToList().ForEach(x =>
                {
                    listEmail.Add(new EmailManagerResponse()
                    {
                        Id = x.id,
                        Email = x.email,
                    });
                });
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
                    Data = listEmail
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpGet]
        [Route("api/admin/list-email-user")]
        public ResponseMessageResult GetListEmailActiveUser()
        {
            var listEmail = new List<EmailManagerResponse>();

            try
            {
                db.users.Where(u => u.isActive == true && (u.role_id == 1 || u.role_id == 2)).ToList().ForEach(x =>
                {
                    listEmail.Add(new EmailManagerResponse()
                    {
                        Email = x.email,
                    });
                });
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
                    Data = listEmail
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpGet]
        [Route("api/admin/user/{id}/parent")]
        public ResponseMessageResult GetParentOfUser(int id)
        {
            var userSelect = db.users.FirstOrDefault(x => x.id == id);
            if (userSelect == null)
            {
                return Common.ResponseMessage.BadRequest("A0003");
            }

            var user = db.users.FirstOrDefault(x => x.id == userSelect.manager_id);
            if (user == null)
            {
                return Common.ResponseMessage.BadRequest("A0003");
            }

            UserInformationResponse userInfo = new UserInformationResponse();
            try
            {
                userInfo.UserId = user.id;
                userInfo.Name = user.name;
                userInfo.Email = user.email;
                userInfo.RoleId = user.role_id;
                userInfo.IsActive = user.isActive;
                userInfo.EmailManager = user.user2?.email;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
                    Data = userInfo,
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpGet]
        [Route("api/admin/list-user-da")]
        public ResponseMessageResult GetListDaUser()
        {
            var listUser = new List<UserInformationImportedResponse>();
            try
            {
                var user = db.users.Where(x => x.isActive == false);
                foreach (var u in user)
                {
                    listUser.Add(new UserInformationImportedResponse()
                    {
                        Id = u.id,
                        Name = u.name,
                        Email = u.email,
                        RoleId = u.role_id,
                    });
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
                    Data = listUser
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpGet]
        [Route("api/admin/contacts/list-user/{id}")]
        public ResponseMessageResult GetListContactUser(int id)
        {
            var listCt = new List<ContactOfDaUserResponse>();
            var user = db.users.FirstOrDefault(x => x.id == id);
            if (user == null)
            {
                return Common.ResponseMessage.BadRequest("C0018");
            }

            try
            {
                var ct = db.contacts.Where(x => x.owner_id == user.id && x.createdBy == user.id);
                foreach (var u in ct)
                {
                    var isNew = DateTime.Now.Subtract(u.create_date).Hours < 1;
                    listCt.Add(new ContactOfDaUserResponse
                    {
                        Id = u.id,
                        Name = u.name,
                        Company = u.company,
                        IsActive = u.isActive,
                        IsNew = isNew
                    });
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
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
        [Route("api/admin/contacts/list-user-da/{id}")]
        public ResponseMessageResult GetListContactDaUser(int id)
        {
            var listCt = new List<ContactOfDaUserResponse>();
            var user = db.users.FirstOrDefault(x => x.id == id && x.isActive == false);
            if (user == null)
            {
                return Common.ResponseMessage.BadRequest("C0018");
            }

            try
            {
                var ct = db.contacts.Where(x => x.owner_id == user.id && x.createdBy == user.id);
                foreach (var u in ct)
                {
                    listCt.Add(new ContactOfDaUserResponse
                    {
                        Id = u.id,
                        Name = u.name,
                        Company = u.company,
                        IsActive = u.isActive
                    });
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
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
        [Route("api/admin/user/{id}")]
        public ResponseMessageResult GetUserInformation(int id)
        {
            UserInformationResponse response = new UserInformationResponse();

            try
            {
                var user = db.users.FirstOrDefault(x => x.id == id);
                if (user == null)
                    return Common.ResponseMessage.BadRequest("C0018");

                if (user.role_id == 4)
                    return Common.ResponseMessage.BadRequest("C0021");

                response.UserId = user.id;
                response.Name = user.name;
                response.Email = user.email;
                response.RoleId = user.role_id;
                response.IsActive = user.isActive;
                response.IdManager = user.user2?.id;
                response.EmailManager = user.user2?.email;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
                    Data = response
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpGet]
        [Route("api/admin/user/list")]
        public ResponseMessageResult GetListUser()
        {
            List<UserInformationResponse> list = new List<UserInformationResponse>();

            try
            {
                var user = db.users.Where(x => x.role_id != 4).ToList();

                foreach (var u in user)
                {
                    UserInformationResponse response = new UserInformationResponse
                    {
                        UserId = u.id,
                        Name = u.name,
                        Email = u.email,
                        RoleId = u.role_id,
                        IsActive = u.isActive,
                        IdManager = u.user2?.id,
                        EmailManager = u.user2?.name
                    };
                    list.Add(response);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
                    Data = list
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpDelete]
        [Route("api/admin/user-imported/{id}")]
        public ResponseMessageResult DeleteUserImport(int id)
        {
            try
            {
                var user = db.import_user.FirstOrDefault(x => x.id == id);
                if (user == null)
                    return Common.ResponseMessage.BadRequest("C0018");

                db.import_user.Remove(user);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
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

        [HttpDelete]
        [Route("api/admin/user-imported")]
        public ResponseMessageResult DeleteAllUserImport()
        {
            try
            {
                var user = db.import_user.ToList();
                db.import_user.RemoveRange(user);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
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

        [HttpGet]
        [Route("api/admin/user-imported")]
        public ResponseMessageResult GetListUserImported()
        {
            var listUser = new List<UserInformationImportedResponse>();

            try
            {
                var list = db.import_user.ToList();
                foreach (var user in list)
                {
                    listUser.Add(new UserInformationImportedResponse()
                    {
                        Id = user.id,
                        Email = user.email,
                        Name = user.name,
                        RoleId = user.role_id,
                        Status = user.status,
                        EmailManager = user.manager,
                        CheckEmail = db.users.FirstOrDefault(x => x.email == user.email) != null,
                    });
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
                    Data = listUser
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpGet]
        [Route("api/admin/user-imported/{id}")]
        public ResponseMessageResult GetUserImportedDetail(int id)
        {
            var selectUser = new UserInformationImportedResponse();

            try
            {
                var user = db.import_user.FirstOrDefault(x => x.id == id);

                if (user == null)
                    return Common.ResponseMessage.BadRequest("C0018");

                selectUser.Id = user.id;
                selectUser.Name = user.name;
                selectUser.Email = user.email;
                selectUser.RoleId = user.role_id;
                selectUser.EmailManager = user.manager;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
                    Data = selectUser
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpGet]
        [Route("api/admin/search")]
        public ResponseMessageResult GetSearch(string value = "")
        {
            List<UserInformationResponse> listCt = new List<UserInformationResponse>();

            try
            {
                if (value == null)
                {
                    value = "";
                }

                listCt = SearchUser(listCt, value, db.users.Where(x => x.role_id != 4));
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
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

        public List<UserInformationResponse> SearchUser(List<UserInformationResponse> listCt, string value,
            IQueryable<user> query)
        {
            var draft = query;
            try
            {
                UserInformationResponse sc;
                foreach (var c in draft)
                {
                    if (ContactController.RemoveSign4VietnameseString(c.name)
                        .Contains(ContactController.RemoveSign4VietnameseString(value.Trim())))
                    {
                        sc = new UserInformationResponse
                        {
                            UserId = c.id,
                            Name = c.name,
                            Email = c.email,
                            IsActive = c.isActive,
                            RoleId = c.role_id,
                        };
                        listCt.Add(sc);
                    }
                }

                draft = query;
                draft = draft.Where(c => c.email.Trim().ToLower().Contains(value.Trim().ToLower()));
                var listSearch = draft.ToList();
                if (listSearch.Count != 0)
                {
                    foreach (var c in listSearch)
                    {
                        sc = new UserInformationResponse
                        {
                            UserId = c.id,
                            Name = c.name,
                            Email = c.email,
                            IsActive = c.isActive,
                            RoleId = c.role_id,
                        };
                        listCt.Add(sc);
                    }
                }

                listCt = listCt.GroupBy(x => x.UserId).Select(x => x.First()).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
            }

            return listCt;
        }

        [HttpPut]
        [Route("api/admin/user-imported/{id}")]
        public ResponseMessageResult ChangeUserImported([FromBody] ChangeUserImportedRequest request, int id)
        {
            try
            {
                if (request == null)
                    return Common.ResponseMessage.BadRequest("A0004");

                if ((request.RoleId == 2 || request.RoleId == 1) &&
                    (request.Name == null || request.Email == null || request.Manager == null))
                    return Common.ResponseMessage.BadRequest("A0004");

                if ((request.RoleId == 2 || request.RoleId == 1) && (request.Name.Trim() == "" ||
                                                                     request.Email.Trim() == "" ||
                                                                     request.Manager.Trim() == ""))
                    return Common.ResponseMessage.BadRequest("A0004");

                if (!Validator.Validator.CheckName(request.Name.Trim()) ||
                    !Validator.Validator.CheckEmailCorrect(request.Email.Trim()) ||
                    (request.RoleId != 3 && !Validator.Validator.CheckEmailCorrect(request.Manager.Trim())))
                    return Common.ResponseMessage.BadRequest("A0004");

                var selectUserByEmail = db.users.FirstOrDefault(x => x.email == request.Email);
                if (selectUserByEmail != null)
                    return Common.ResponseMessage.BadRequest("A0005");

                if (request.RoleId != 3 && request.Manager.Trim() != "")
                {
                    var selectUserByEmailManager =
                        db.users.FirstOrDefault(x => x.email == request.Manager && x.isActive == true);
                    var selectUserByEmailManagerRq = db.import_user.FirstOrDefault(x => x.email == request.Manager);
                    if (selectUserByEmailManager == null && selectUserByEmailManagerRq == null)
                        return Common.ResponseMessage.BadRequest("A0005");
                    if (selectUserByEmailManagerRq != null && request.Manager == selectUserByEmailManagerRq.email &&
                        selectUserByEmailManagerRq.role_id == 1)
                        return Common.ResponseMessage.BadRequest("A0010");
                }

                var selectUserImported = db.import_user.FirstOrDefault(x => x.id == id);
                if (selectUserImported == null)
                    return Common.ResponseMessage.BadRequest("A0006");

                selectUserImported.name = request.Name;
                selectUserImported.email = request.Email;
                selectUserImported.role_id = request.RoleId;
                selectUserImported.manager = request.Manager;
                if (request.RoleId == 3)
                    selectUserImported.manager = null;

                db.SaveChanges();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
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

        [HttpPatch]
        [Route("api/admin/transfer")]
        public ResponseMessageResult TransferContactFromDaUser([FromBody] TransferContact tranCt)
        {
            try
            {
                if (!string.IsNullOrEmpty(tranCt.TransferFrom))
                {
                    var from = db.users.FirstOrDefault(u => u.email == tranCt.TransferFrom && u.isActive == true);
                    if (from != null)
                    {
                        return Common.ResponseMessage.BadRequest("C0018");
                    }
                }

                string email = tranCt.TransferTo ?? "";

                var user = db.users.FirstOrDefault(u => u.email == email);
                if (user == null)
                {
                    return Common.ResponseMessage.BadRequest("C0018");
                }

                foreach (var ct in tranCt.ContactIds)
                {
                    var ctId = ct;
                    var contact = db.contacts.FirstOrDefault(c => c.id == ctId);
                    if (contact != null)
                    {
                        contact.groups.Clear();
                        contact.status_id = "S0002";
                        contact.flag_id = null;
                        contact.owner_id = user.id;
                        contact.createdBy = user.id;
                        contact.create_date = DateTime.Now;
                        db.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
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

        [HttpPost]
        [Route("api/admin/user-imported/{id}")]
        public ResponseMessageResult AddUser(int id)
        {
            try
            {
                var selectUserImported = db.import_user.FirstOrDefault(x => x.id == id);
                if (selectUserImported == null)
                    return Common.ResponseMessage.BadRequest("A0006");

                if (selectUserImported.manager == null && selectUserImported.role_id < 3)
                    return Common.ResponseMessage.BadRequest("A0005");

                var selectUser = db.users.FirstOrDefault(x => x.email == selectUserImported.email);
                if (selectUser != null)
                    return Common.ResponseMessage.BadRequest("A0008");

                var selectUserManager = db.users.FirstOrDefault(x => x.email == selectUserImported.manager);
                if (selectUserManager == null && (selectUserImported.role_id == 1 || selectUserImported.role_id == 2))
                    return Common.ResponseMessage.BadRequest("A0005");

                var boss = db.users.FirstOrDefault(x => x.role_id == 3 && x.isActive == true);
                if (boss != null && (selectUserImported.manager == null || selectUserImported.manager.Trim() == ""))
                {
                    var user = db.users.Add(new user()
                    {
                        name = selectUserImported.name,
                        password = PasswordGenerator.Generate(),
                        email = selectUserImported.email,
                        role_id = selectUserImported.role_id ?? 1,
                        isActive = true,
                        manager_id = null
                    });

                    var listUser = db.users.Where(x => x.manager_id == boss.id).ToList();
                    if (listUser.Count > 0)
                    {
                        foreach (var u in listUser)
                        {
                            u.manager_id = user.id;
                        }
                    }

                    boss.isActive = false;
                    selectUserImported.status = 2;
                    db.SaveChanges();
                    return new ResponseMessageResult(new HttpResponseMessage
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "Success",
                        }), Encoding.UTF8, "application/json")
                    });
                }

                if (selectUserImported.role_id > 3)
                    return Common.ResponseMessage.BadRequest("A0009");

                var selectUserByEmailManagerRq =
                    db.import_user.FirstOrDefault(x => x.email == selectUserImported.manager);
                if (selectUserByEmailManagerRq != null &&
                    selectUserImported.manager == selectUserByEmailManagerRq.email &&
                    selectUserByEmailManagerRq.role_id == 1)
                    return Common.ResponseMessage.BadRequest("A0010");

                var password = PasswordGenerator.Generate();
                var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
                db.users.Add(new user()
                {
                    name = selectUserImported.name,
                    password = passwordHash,
                    email = selectUserImported.email,
                    role_id = selectUserImported.role_id ?? 1,
                    isActive = true,
                    manager_id = selectUserManager?.id
                });

                SendGridConfig.SendPassword(selectUserImported.email, password);

                selectUserImported.status = 2;
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
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

        [HttpPost]
        [Route("api/admin/user")]
        public ResponseMessageResult AddUserManual([FromBody] ChangeUserImportedRequest request)
        {
            try
            {
                if (request == null)
                    return Common.ResponseMessage.BadRequest("A0004");

                if ((request.RoleId == 2 || request.RoleId == 1) &&
                    (request.Name == null || request.Email == null || request.Manager == null))
                    return Common.ResponseMessage.BadRequest("A0004");

                if ((request.RoleId == 2 || request.RoleId == 1) && (request.Name.Trim() == "" ||
                                                                     request.Email.Trim() == "" ||
                                                                     request.Manager.Trim() == ""))
                    return Common.ResponseMessage.BadRequest("A0004");

                if (!Validator.Validator.CheckName(request.Name.Trim()) ||
                    !Validator.Validator.CheckEmailCorrect(request.Email.Trim()) ||
                    (request.RoleId != 3 && !Validator.Validator.CheckEmailCorrect(request.Manager.Trim())))
                    return Common.ResponseMessage.BadRequest("A0004");

                var selectUserByEmail = db.users.FirstOrDefault(x => x.email == request.Email);
                if (selectUserByEmail != null)
                    return Common.ResponseMessage.BadRequest("A0008");

                var selectUserByEmailManager =
                    db.users.FirstOrDefault(x => x.email == request.Manager);
                if (request.RoleId != 3 && request.Manager.Trim() != "")
                {
                    if (selectUserByEmailManager != null && (selectUserByEmailManager.role_id == 1 ||
                                                             selectUserByEmailManager.isActive == false))
                        return Common.ResponseMessage.BadRequest("A0005");
                }

                var boss = db.users.FirstOrDefault(x => x.role_id == 3 && x.isActive == true);
                if (boss != null && request.RoleId == 3)
                {
                    var user = db.users.Add(new user()
                    {
                        name = request.Name,
                        password = PasswordGenerator.Generate(),
                        email = request.Email,
                        role_id = request.RoleId,
                        isActive = true,
                        manager_id = null
                    });

                    var listUser = db.users.Where(x => x.manager_id == boss.id).ToList();
                    if (listUser.Count > 0)
                    {
                        foreach (var u in listUser)
                        {
                            u.manager_id = user.id;
                        }
                    }

                    boss.isActive = false;
                    db.SaveChanges();
                    return new ResponseMessageResult(new HttpResponseMessage
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "Success",
                        }), Encoding.UTF8, "application/json")
                    });
                }

                var password = PasswordGenerator.Generate();
                var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
                db.users.Add(new user()
                {
                    name = request.Name,
                    password = passwordHash,
                    email = request.Email,
                    role_id = request.RoleId,
                    isActive = true,
                    manager_id = selectUserByEmailManager?.id
                });

                SendGridConfig.SendPassword(request.Email, password);

                db.SaveChanges();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
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

        [HttpPut]
        [Route("api/admin/user/{id}")]
        public ResponseMessageResult UpdateUser([FromBody] UserInformationResponse user, int id)
        {
            try
            {
                if (user == null)
                    return Common.ResponseMessage.BadRequest("A0004");

                if (user.Email == user.EmailManager)
                    return Common.ResponseMessage.BadRequest("A0005");

                if ((user.RoleId == 2 || user.RoleId == 1) &&
                    (user.Name == null || user.Email == null || user.EmailManager == null))
                    return Common.ResponseMessage.BadRequest("A0004");

                if ((user.RoleId == 2 || user.RoleId == 1) && (user.Name.Trim() == "" ||
                                                               user.Email.Trim() == "" ||
                                                               user.EmailManager.Trim() == ""))
                    return Common.ResponseMessage.BadRequest("A0004");

                if (!Validator.Validator.CheckName(user.Name.Trim()) ||
                    !Validator.Validator.CheckEmailCorrect(user.Email.Trim()) ||
                    (user.RoleId != 3 && !Validator.Validator.CheckEmailCorrect(user.EmailManager.Trim())))
                    return Common.ResponseMessage.BadRequest("A0004");

                var selectUserByEmail = db.users.FirstOrDefault(x => x.email == user.Email && x.id != id);
                if (selectUserByEmail != null)
                    return Common.ResponseMessage.BadRequest("A0005");

                var selectUserByEmailManager =
                    db.users.FirstOrDefault(x => x.email == user.EmailManager && x.isActive == true);
                if (user.RoleId != 3 && user.EmailManager.Trim() != "")
                {
                    if (selectUserByEmailManager != null && selectUserByEmailManager.role_id == 1)
                        return Common.ResponseMessage.BadRequest("A0010");
                }

                var userUpdate = db.users.FirstOrDefault(x => x.id == id);
                if (userUpdate == null)
                    return Common.ResponseMessage.BadRequest("A0006");

                var boss = db.users.FirstOrDefault(x => x.role_id == 3 && x.isActive == true);
                if (boss != null && user.RoleId == 3 && user.Email != boss.email)
                {
                    userUpdate.name = user.Name;
                    userUpdate.email = user.Email;
                    userUpdate.role_id = user.RoleId;
                    userUpdate.isActive = user.IsActive ?? true;
                    userUpdate.manager_id = null;

                    var listUser = db.users.Where(x => x.manager_id == boss.id && x.email != user.Email).ToList();
                    if (listUser.Count > 0)
                    {
                        foreach (var u in listUser)
                        {
                            u.manager_id = userUpdate.id;
                        }
                    }

                    boss.isActive = false;
                    db.SaveChanges();
                    return new ResponseMessageResult(new HttpResponseMessage
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "Success",
                        }), Encoding.UTF8, "application/json")
                    });
                }

                var listManager = db.users.Where(x => x.manager_id == userUpdate.id).ToList();
                if (user.IsActive == false && listManager.Count > 0)
                {
                    return Common.ResponseMessage.BadRequest("A0011");
                }

                userUpdate.name = user.Name;
                userUpdate.email = user.Email;
                if (userUpdate.role_id != 3)
                {
                    userUpdate.role_id = user.RoleId;
                    userUpdate.isActive = user.IsActive ?? true;
                    userUpdate.manager_id = selectUserByEmailManager?.id;
                }

                db.SaveChanges();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
            }

            return new ResponseMessageResult(new HttpResponseMessage
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpPost]
        [Route("api/admin/user/export")]
        public ResponseMessageResult ExportUser()
        {
            var dateCreated = DateTime.Now;
            try
            {
                var listUser = new List<user>();
                var wbook = new XLWorkbook();
                var boss = db.users.FirstOrDefault(x => x.role_id == 3);
                if (boss != null)
                {
                    listUser.Add(boss);
                }

                var manager = db.users.Where(x => x.role_id == 2).ToList();
                if (manager.Count > 0)
                {
                    listUser.AddRange(manager);
                }

                var staff = db.users.Where(x => x.role_id == 1).ToList();
                if (staff.Count > 0)
                {
                    listUser.AddRange(staff);
                }

                var fileName = AppDomain.CurrentDomain.BaseDirectory + "Files\\ExportUsers_" +
                               dateCreated.ToString("M-d-yyyy") + ".xlsx";
                var ws = wbook.Worksheets.Add("Users");

                string[] headers =
                {
                    "Name", "Email", "Status", "Job Title", "Manager"
                };
                var row = 1;
                var col = 1;
                foreach (var header in headers)
                {
                    ws.Cell(row, col).Value = header;
                    ws.Cell(row, col).Style.Fill.BackgroundColor = XLColor.BabyBlue;
                    ws.Column(col).Width = 20;
                    col++;
                }

                row++;
                col = 1;

                foreach (var c in listUser)
                {
                    ws.Cell(row, col).Value = c.name;
                    col++;
                    ws.Cell(row, col).Value = c.email;
                    col++;
                    ws.Cell(row, col).Value = c.isActive != null ? "Active" : "Inactive";
                    col++;
                    ws.Cell(row, col).Value = c.role.name;
                    col++;
                    ws.Cell(row, col).Value = db.users.FirstOrDefault(x => x.id == c.manager_id)?.name;
                    row++;
                    col = 1;
                }

                ws.Columns().AdjustToContents();
                wbook.SaveAs(fileName);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
                return Common.ResponseMessage.BadRequest("C0001");
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
                    Data = new
                    {
                        link = $"https://{Request.RequestUri.Host}/Files/ExportUsers_{dateCreated:M-d-yyyy}.xlsx"
                    }
                }), Encoding.UTF8, "application/json")
            });
        }

        private static class PasswordGenerator
        {
            private static readonly Random Rand = new Random();

            public static string Generate()
            {
                string upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                string lowerChars = "abcdefghijklmnopqrstuvwxyz";
                string specialChars = "!@#$%^&*+?~";
                string numbers = "0123456789";
                string password = "";
                //random 1 char in upperChars
                password += upperChars[Rand.Next(0, upperChars.Length)];
                password += specialChars[Rand.Next(0, specialChars.Length)];
                password += numbers[Rand.Next(0, numbers.Length)];
                for (int i = 0; i < 5; i++)
                {
                    password += lowerChars[Rand.Next(0, lowerChars.Length)];
                }

                return password;
            }
        }
    }
}