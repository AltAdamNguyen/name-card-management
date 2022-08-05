using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using NCMSystem.Controllers;
using NCMSystem.Models;
using NCMSystem.Filter;
using NCMSystem.Models.CallAPI.Contact;
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
                Assert.IsTrue(json.ContainsKey("data"));
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
                Assert.IsTrue(json.ContainsKey("data"));
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
                Assert.IsTrue(json.ContainsKey("data"));
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
                Assert.IsTrue(json.ContainsKey("data"));
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
                Assert.IsTrue(json.ContainsKey("data"));
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
                Assert.IsTrue(json.ContainsKey("data"));
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
                Assert.IsTrue(json.ContainsKey("data"));
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
                Assert.IsTrue(json.ContainsKey("data"));
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
                Assert.IsTrue(json.ContainsKey("data"));
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
                Assert.IsTrue(json.ContainsKey("data"));
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
                Assert.IsTrue(json.ContainsKey("data"));
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
                Assert.IsTrue(json.ContainsKey("data"));
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
                Assert.IsTrue(json.ContainsKey("data"));
            }
        }

        public class TestAddContact
        {
            [TestCase(null)]
            [TestCase("")]
            public void Test_Null_Empty_Name_ReturnStatusCodeBadRequest(string test)
            {
                ContactRequest contactRequest = new ContactRequest()
                {
                    Name = test
                };
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

                var res = controller.PostAddContact(contactRequest);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }

            [TestCase(null)]
            [TestCase("")]
            public void Test_Null_Empty_Email_ReturnStatusCodeBadRequest(string test)
            {
                ContactRequest contactRequest = new ContactRequest()
                {
                    Email = test
                };
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

                var res = controller.PostAddContact(contactRequest);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }

            [TestCase(null)]
            [TestCase("")]
            public void Test_Null_Empty_Company_ReturnStatusCodeBadRequest(string test)
            {
                ContactRequest contactRequest = new ContactRequest()
                {
                    Company = test
                };
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

                var res = controller.PostAddContact(contactRequest);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }

            [Test]
            public void Test_Success_ReturnIdContact()
            {
                ContactRequest contactRequest = new ContactRequest()
                {
                    Name = "Test",
                    Email = "Test@gmail.com",
                    Company = "Test"
                };
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
                var res = controller.PostAddContact(contactRequest);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsTrue(json.ContainsKey("data"));
            }
        }

        public class TestExportContact
        {
            [Test]
            public void Test_Null_Id_ReturnStatusCodeBadRequest()
            {
                ExportRequest contactRequest = new ExportRequest
                {
                    ArrayId = null
                };
                // init information of user
                const int userId = 7;
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

                var res = controller.ExportContact(contactRequest);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }
        }

        public class TestTransferOwnerContact
        {
            [Test]
            public void Test_Null_Email_ReturnStatusCodeBadRequest()
            {
                TransferContact contactRequest = new TransferContact
                {
                    TransferTo = null
                };
                // init information of user
                const int userId = 7;
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

                var res = controller.TransferOwnContact(contactRequest);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }

            [Test]
            public void Test_Success_ReturnStatusCodeOk()
            {
                TransferContact contactRequest = new TransferContact
                {
                    ContactIds = new[] { 1, 2 },
                    TransferTo = "study@nmtung.dev"
                };
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

                var res = controller.TransferOwnContact(contactRequest);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
        }

        public class TestRequestTransferContact
        {
            [Test]
            public void Test_NullId_ReturnStatusCodeBad()
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

                var res = controller.RequestTransferContact();

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }

            [Test]
            public void Test_IdLessThan0_ReturnStatusCodeBad()
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

                var res = controller.RequestTransferContact(id: -1);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }

            [Test]
            public void Test_NotExistId_ReturnStatusCodeBad()
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

                var res = controller.RequestTransferContact(id: 100);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }

            [Test]
            public void Test_Success_ReturnStatusCodeOk()
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

                var res = controller.RequestTransferContact(3, 4);

                var json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsTrue(json.ContainsKey("data"));
            }
        }

        public class TestUpdateContact
        {
            [TestCase(null)]
            [TestCase("")]
            public void Test_Null_Empty_Name_ReturnStatusCodeBadRequest(string test)
            {
                ContactRequest contactRequest = new ContactRequest()
                {
                    Name = test
                };
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

                var res = controller.PutUpdateContact(3, contactRequest);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }

            [TestCase(null)]
            [TestCase("")]
            public void Test_Null_Empty_Email_ReturnStatusCodeBadRequest(string test)
            {
                ContactRequest contactRequest = new ContactRequest()
                {
                    Email = test
                };
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

                var res = controller.PutUpdateContact(3, contactRequest);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }

            [TestCase(null)]
            [TestCase("")]
            public void Test_Null_Empty_Company_ReturnStatusCodeBadRequest(string test)
            {
                ContactRequest contactRequest = new ContactRequest()
                {
                    Company = test
                };
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

                var res = controller.PutUpdateContact(3, contactRequest);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }

            [Test]
            public void Test_IdNotExist_ReturnStatusCodeBadRequest()
            {
                ContactRequest contactRequest = new ContactRequest()
                {
                    Name = "Test",
                    Email = "Test@gmail.com",
                    Company = "Test"
                };
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

                var res = controller.PutUpdateContact(-99, contactRequest);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.NotFound, res.Response.StatusCode);
            }

            [Test]
            public void Test_Success_ReturnMessage()
            {
                ContactRequest contactRequest = new ContactRequest()
                {
                    Name = "Test",
                    Email = "Test12313@gmail.com",
                    Company = "Test"
                };
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
                var res = controller.PutUpdateContact(5, contactRequest);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
        }

        public class TestSetFlagContact
        {
            [Test]
            public void Test_IdNotExist_ReturnStatusCodeBadRequest()
            {
                FlagContact contactRequest = new FlagContact()
                {
                    Flag = "F0001"
                };
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

                var res = controller.PatchFlag(-99, contactRequest);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.NotFound, res.Response.StatusCode);
            }

            [Test]
            public void Test_WrongCodeFlag_ReturnStatusCodeBadRequest()
            {
                FlagContact contactRequest = new FlagContact()
                {
                    Flag = "d"
                };
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

                var res = controller.PatchFlag(3, contactRequest);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }

            [Test]
            public void Test_Success_ReturnStatusCodeOk()
            {
                FlagContact flagContactRequest = new FlagContact()
                {
                    Flag = "F0001"
                };
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
                var res = controller.PatchFlag(3, flagContactRequest);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
        }

        public class TestSetStatusContact
        {
            [Test]
            public void Test_IdNotExist_ReturnStatusCodeBadRequest()
            {
                StatusContact contactRequest = new StatusContact()
                {
                    Status = "S0001"
                };
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

                var res = controller.PatchStatus(-99, contactRequest);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.NotFound, res.Response.StatusCode);
            }

            [Test]
            public void Test_InputNotExistCodeStatus_ReturnStatusCodeBadRequest()
            {
                StatusContact contactRequest = new StatusContact()
                {
                    Status = "d",
                };
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

                var res = controller.PatchStatus(3, contactRequest);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }

            [Test]
            public void Test_StatusFailedOrSuccessWithoutReason_ReturnStatusCodeBadRequest()
            {
                StatusContact contactRequest = new StatusContact()
                {
                    Status = "S0001",
                };
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

                var res = controller.PatchStatus(3, contactRequest);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }

            [Test]
            public void Test_Success_ReturnStatusCodeOk()
            {
                StatusContact flagContactRequest = new StatusContact()
                {
                    Status = "S0001",
                    ReasonStatus = "dasdsa"
                };
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
                var res = controller.PatchStatus(3, flagContactRequest);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
        }
        
        public class TestDeactiveContact
        {
            [Test]
            public void Test_IdNotExist_ReturnStatusCodeBadRequest()
            {
                ReasonDaContact contactRequest = new ReasonDaContact();
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

                var res = controller.PatchDeActive(-99, contactRequest);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.NotFound, res.Response.StatusCode);
            }

            [Test]
            public void Test_NoReasonDeactive_ReturnStatusCodeBadRequest()
            {
                ReasonDaContact contactRequest = new ReasonDaContact();
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

                var res = controller.PatchDeActive(3, contactRequest);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }

            [Test]
            public void Test_Success_ReturnStatusCodeOk()
            {
                ReasonDaContact flagContactRequest = new ReasonDaContact()
                {
                    ReasonDa = "dasdsa"
                };
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
                var res = controller.PatchDeActive(3, flagContactRequest);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
        }
        
        public class TestActiveContact
        {
            [Test]
            public void Test_IdNotExist_ReturnStatusCodeBadRequest()
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

                var res = controller.PatchActive(-99);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.NotFound, res.Response.StatusCode);
            }

            [Test]
            public void Test_Success_ReturnStatusCodeOk()
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
                var res = controller.PatchActive(3);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
        }
    }
}