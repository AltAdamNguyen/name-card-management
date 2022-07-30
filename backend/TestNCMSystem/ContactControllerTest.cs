using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using NCMSystem.Controllers;
using NCMSystem.Models;
using NCMSystem.Filter;
using Newtonsoft.Json.Linq;
using NUnit.Framework;
using static Newtonsoft.Json.Linq.JObject;

namespace TestNCMSystem
{
    [TestFixture]
    public class ContactControllerTest
    {
        private static readonly NCMSystemEntities db =
            new NCMSystemEntities(Environment.GetEnvironmentVariable("NCMSystemEntities"));

        public class TestGetListContacts
        {
            [Test]
            public void Test_NullSortBy_ReturnStatusCodeBadRequest()
            {
                // init information of user
                const int userId = 2;
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

                var controller = new ContactController();
                controller.Request = request;
                var res = controller.GetListHome(sortBy: null);

                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }

            [Test]
            public void Test_NullFlag_ReturnStatusCodeBadRequest()
            {
                // init information of user
                const int userId = 2;
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

                var controller = new ContactController();
                controller.Request = request;
                var res = controller.GetListHome(flag: null);

                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }

            [Test]
            public void Test_ValuePageLessThan1_ReturnListContacts()
            {
                // init information of user
                const int userId = 2;
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

                var controller = new ContactController();
                controller.Request = request;
                var res = controller.GetListHome(page: 0);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsNotEmpty(json["data"]);
            }

            [Test]
            public void Test_Success_ReturnListContacts()
            {
                // init information of user
                const int userId = 2;
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

                var controller = new ContactController();
                controller.Request = request;
                var res = controller.GetListHome();

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsNotEmpty(json["data"]);
            }

            [Test]
            public void Test_HasFlag_Success_ReturnListContacts()
            {
                // init information of user
                const int userId = 2;
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

                var controller = new ContactController();
                controller.Request = request;
                var res = controller.GetListHome(flag: "F0002");

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsNotEmpty(json["data"]);
            }

            [Test]
            public void Test_HasSortBy_Success_ReturnListContacts()
            {
                // init information of user
                const int userId = 2;
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

                var controller = new ContactController();
                controller.Request = request;
                var res = controller.GetListHome(sortBy: "name");

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsNotEmpty(json["data"]);
            }
        }

        public class TestGetDetailContact
        {
            [Test]
            public void Test_Success_ReturnDetailContact()
            {
                // init information of user
                const int userId = 2;
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

                var controller = new ContactController();
                controller.Request = request;
                var res = controller.GetDetail(3);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsNotEmpty(json["data"]);
            }

            [Test]
            public void Test_IdNotExist_ReturnStatusCodeNotFound()
            {
                // init information of user
                const int userId = 2;
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

                var controller = new ContactController();
                controller.Request = request;
                var res = controller.GetDetail(-1);

                Assert.AreEqual(HttpStatusCode.NotFound, res.Response.StatusCode);
            }
        }

        public class TestGetListDeactiveContact
        {
            [Test]
            public void Test_ValuePageLessThan1_ReturnListDeactiveContact()
            {
                // init information of user
                const int userId = 2;
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

                var controller = new ContactController();
                controller.Request = request;
                var res = controller.GetListDaContact(0);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsNotEmpty(json["data"]);
            }

            [Test]
            public void Test_Success_ReturnListDeactiveContact()
            {
                // init information of user
                const int userId = 2;
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

                var controller = new ContactController();
                controller.Request = request;
                var res = controller.GetListDaContact();

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsNotEmpty(json["data"]);
            }
        }

        public class TestGetListTransferContact
        {
            [Test]
            public void Test_ValuePageLessThan1_ReturnListTransferContact()
            {
                // init information of user
                const int userId = 2;
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

                var controller = new ContactController();
                controller.Request = request;
                var res = controller.GetListTransferContact();

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.NotNull(json["data"]);
            }

            [Test]
            public void Test_Success_ReturnListTransferContact()
            {
                // init information of user
                const int userId = 2;
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

                var controller = new ContactController();
                controller.Request = request;
                var res = controller.GetListTransferContact();

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsNotEmpty(json["data"]);
            }
        }

        public class TestGetSearchContact
        {
            [Test]
            public void Test_NullValue_ReturnListSearchContact()
            {
                // init information of user
                const int userId = 2;
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

                var controller = new ContactController();
                controller.Request = request;
                var res = controller.GetSearch(value: null);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsNotEmpty(json["data"]);
            }
            
            [Test]
            public void Test_NullUserId_ReturnListSearchContact()
            {
                // init information of user
                const int userId = 2;
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

                var controller = new ContactController();
                controller.Request = request;
                var res = controller.GetSearch(userId: null);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsNotEmpty(json["data"]);
            }

            [Test]
            public void Test_Success_ReturnListSearchContact()
            {
                // init information of user
                const int userId = 2;
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

                var controller = new ContactController();
                controller.Request = request;
                var res = controller.GetListTransferContact();

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsNotEmpty(json["data"]);
            }
        }

        public class TestGetSearchContactTransfer
        {
            [Test]
            public void Test_NullValue_ReturnListSearchContact()
            {
                // init information of user
                const int userId = 2;
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

                var controller = new ContactController();
                controller.Request = request;
                var res = controller.GetSearchListTransfer(value: null);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsNotEmpty(json["data"]);
            }
            
            [Test]
            public void Test_Success_ReturnListSearchContact()
            {
                // init information of user
                const int userId = 2;
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

                var controller = new ContactController();
                controller.Request = request;
                var res = controller.GetSearchListTransfer();

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsNotEmpty(json["data"]);
            }
        }
        
        public class TestAddContact
        {
            [Test]
            public void Test_NullValue_ReturnListSearchContact()
            {
                // init information of user
                const int userId = 2;
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

                var controller = new ContactController();
                controller.Request = request;
                var res = controller.GetSearchListTransfer(value: null);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsNotEmpty(json["data"]);
            }
            
            [Test]
            public void Test_Success_ReturnListSearchContact()
            {
                // init information of user
                const int userId = 2;
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

                var controller = new ContactController();
                controller.Request = request;
                var res = controller.GetSearchListTransfer();

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsNotEmpty(json["data"]);
            }
        }
    }
}