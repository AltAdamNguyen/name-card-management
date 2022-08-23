using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using NCMSystem.Controllers;
using NCMSystem.Models;
using NCMSystem.Filter;
using NCMSystem.Models.CallAPI.Admin;
using Newtonsoft.Json.Linq;
using NUnit.Framework;
using static Newtonsoft.Json.Linq.JObject;

namespace TestNCMSystem
{
    [TestFixture]
    public class AdminControllerTest
    {
        private static readonly NCMSystemEntities db =
            new NCMSystemEntities(Environment.GetEnvironmentVariable("NCMSystemEntities"));

        public class TestGetListMember
        {
            [TestCase(-1)]
            [TestCase(7)]
            public void Test_IdNotExist_Success_ReturnListMembers(int id)
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.GetListMember(id);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsTrue(json.ContainsKey("data"));
            }
        }

        public class TestGetListEmailManager
        {
            [Test]
            public void Test_Success_ReturnListEmail()
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.GetListEmailManager();

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsTrue(json.ContainsKey("data"));
            }
        }

        public class TestGetListEmailActiveUser
        {
            [Test]
            public void Test_Success_ReturnListEmail()
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.GetListEmailActiveUser();

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsTrue(json.ContainsKey("data"));
            }
        }

        public class TestGetParentOfUser
        {
            [Test]
            public void Test_IdNotExist_ReturnListParent()
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.GetParentOfUser(-1);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }
            
            [Test]
            public void Test_Success_ReturnListParent()
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.GetParentOfUser(167);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsTrue(json.ContainsKey("data"));
            }
        }

        public class TestGetListDaUser
        {
            [Test]
            public void Test_Success_ReturnListDaUser()
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.GetListDaUser();

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsTrue(json.ContainsKey("data"));
            }
        }

        public class TestGetListContactUser
        {
            [Test]
            public void Test_IdNotExist_ReturnStatusCodeBad()
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.GetListContactUser(-1);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }
            
            [Test]
            public void Test_Success_ReturnListContact()
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.GetListContactUser(2);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsTrue(json.ContainsKey("data"));
            }
        }
        
        public class TestGetListContactDaUser
        {
            [Test]
            public void Test_IdNotExist_ReturnStatusCodeBad()
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.GetListContactDaUser(-1);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }
            
            [Test]
            public void Test_Success_ReturnListDaContact()
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.GetListContactDaUser(102);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsTrue(json.ContainsKey("data"));
            }
        }

        public class TestGetUserInformation
        {
            [Test]
            public void Test_IdNotExist_ReturnStatusCodeBad()
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.GetUserInformation(-1);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }
            
            [Test]
            public void Test_Success_ReturnUser()
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.GetUserInformation(2);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsTrue(json.ContainsKey("data"));
            }
        }

        public class TestGetListUser
        {
            [Test]
            public void Test_Success_ReturnListUser()
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.GetListUser();

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsTrue(json.ContainsKey("data"));
            }
        }

        public class TestDeleteUserImport
        {
            [Test]
            public void Test_IdNotExist_ReturnStatusCodeBad()
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.DeleteUserImport(-1);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }
            
            [Test]
            public void Test_Success_ReturnStatusCodeOk()
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.DeleteUserImport(355);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
        }
        
        public class TestGetListUserImported
        {
            [Test]
            public void Test_Success_ReturnListUserImported()
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.GetListUserImported();

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsTrue(json.ContainsKey("data"));
            }
        }
        
        public class TestGetUserImportedDetail
        {
            [Test]
            public void Test_IdNotExist_ReturnStatusCodeBad()
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.GetUserImportedDetail(-1);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }
            
            [Test]
            public void Test_Success_ReturnUser()
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.DeleteUserImport(346);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsTrue(json.ContainsKey("data"));
            }
        }

        public class TestGetSearch
        {
            [TestCase(null)]
            [TestCase("")]
            public void Test_Success_ReturnListSearch(string value)
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.GetSearch(value);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsTrue(json.ContainsKey("data"));
            }
        }

        public class TestAddUser
        {
            [Test]
            public void Test_IdNotExist_ReturnStatusCodeBad()
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.AddUser(-1);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }
            
            [Test]
            public void Test_Success_ReturnStatusCodeOk()
            {
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.AddUser(354);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
        }

        public class TestAddUserManual
        {
            [Test]
            public void Test_NullRequest_ReturnStatusCodeBad()
            {
                ChangeUserImportedRequest user = new ChangeUserImportedRequest();
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.AddUserManual(user);
                
                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }
            
            [Test]
            public void Test_Success_ReturnStatusCode()
            {
                ChangeUserImportedRequest user = new ChangeUserImportedRequest
                {
                    Name = "test",
                    Email = "Test@gmail.com",
                    RoleId = 1,
                    Manager = "study@nmtung.dev"
                };
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.AddUserManual(user);
                
                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
        }

        public class TestUpdateUser
        {
            [Test]
            public void Test_NullRequest_ReturnStatusCodeBad()
            {
                UserInformationResponse user = new UserInformationResponse();
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.UpdateUser(user,2);
                
                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }
            
            [Test]
            public void Test_IdUserNotExist_ReturnStatusCodeBad()
            {
                UserInformationResponse user = new UserInformationResponse
                {
                    Name = "Nguyễn Công An",
                    Email = "anhnche141236@gmail.com",
                    RoleId = 1,
                    IsActive = true,
                };
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.UpdateUser(user,-2);
                
                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }
            
            [Test]
            public void Test_Success_ReturnStatusCodeOk()
            {
                UserInformationResponse user = new UserInformationResponse
                {
                    Name = "Nguyễn Công An",
                    Email = "anhnche141236@gmail.com",
                    RoleId = 1,
                    IsActive = true,
                    EmailManager = "conganhnguyen33@gmail.com"
                };
                // init information of user
                const int userId = 4;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken()
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new AdminController();
                controller.Request = request;
                var res = controller.UpdateUser(user,2);
                
                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
        }
    }
}