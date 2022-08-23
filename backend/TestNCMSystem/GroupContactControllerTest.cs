using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using NCMSystem.Controllers;
using NUnit.Framework;
using NCMSystem.Models;
using NCMSystem.Filter;
using NCMSystem.Models.CallAPI.Group_Contact;
using Newtonsoft.Json.Linq;
using static Newtonsoft.Json.Linq.JObject;

namespace TestNCMSystem
{
    [TestFixture]
    public class GroupContactControllerTest
    {
        private static readonly NCMSystemEntities db =
            new NCMSystemEntities(Environment.GetEnvironmentVariable("NCMSystemEntities"));

        public class TestGetListGroupContact
        {
            [Test]
            public void Test_Success_ReturnListGroup()
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

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.GetHomeListGroupContact();

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsTrue(json.ContainsKey("data"));
            }
        }

        public class TestGetGroupContactDetail
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

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.GetGroupContactDetail(-99);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }

            [Test]
            public void Test_Success_ReturnGroup()
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

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.GetHomeListGroupContact();

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsTrue(json.ContainsKey("data"));
            }
        }

        public class TestSearchGroup
        {
            [Test]
            public void Test_NullValueSearch_ReturnStatusCodeOk()
            {
                // init information of user
                const int userId = 2;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.SearchGroupContact(null);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }

            [Test]
            public void Test_Success_ReturnListSearch()
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

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.SearchGroupContact("alo");

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
        }

        public class TestSearchContactInGroup
        {
            [Test]
            public void Test_IdGroupNotExist_ReturnStatusCodeBadRequest()
            {
                // init information of user
                const int userId = 2;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.SearchContactInGroupContact(-99, "hehe");

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }

            [Test]
            public void Test_NullValueSearch_ReturnListSearch()
            {
                // init information of user
                const int userId = 2;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.SearchContactInGroupContact(95, null);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsTrue(json.ContainsKey("data"));
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

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.SearchContactInGroupContact(95, "alo");

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
        }

        public class TestGetContactsAvailableForAGroup
        {
            [Test]
            public void Test_IdGroupNotExist_ReturnStatusCodeBadRequest()
            {
                // init information of user
                const int userId = 2;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.GetContactsAvailableForAGroup("dsa", -11);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.BadRequest, res.Response.StatusCode);
            }

            [Test]
            public void Test_NullValueType_ReturnStatusCodeBadRequest()
            {
                // init information of user
                const int userId = 2;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.GetContactsAvailableForAGroup(null, 95);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
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

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.GetContactsAvailableForAGroup("95", 95);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
        }

        public class TestGetGroupsAvailableForContacts
        {
            [Test]
            public void Test_NullListContactId_ReturnStatusCodeOk()
            {
                AvailableGroupToContactRequest gr = new AvailableGroupToContactRequest();

                // init information of user
                const int userId = 2;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.GetGroupsAvailableForContacts(gr);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }

            [Test]
            public void Test_NullValueType_ReturnStatusCodeBadRequest()
            {
                AvailableGroupToContactRequest gr = new AvailableGroupToContactRequest
                {
                    listContactIds = new List<ContactIdsRequest>()
                    {
                        new ContactIdsRequest()
                        {
                            ContactId = 5,
                        }
                    }
                };

                // init information of user
                const int userId = 2;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.GetGroupsAvailableForContacts(gr);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
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

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.GetContactsAvailableForAGroup("95", 95);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
        }

        public class TestCreateGroup
        {
            [Test]
            public void Test_EmptyRequest_ReturnStatusCodeBadRequest()
            {
                // init information of user
                const int userId = 2;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.AddGroup(new GroupNameRequest
                {
                    GroupName = ""
                });

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

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.AddGroup(new GroupNameRequest
                {
                    GroupName = "Test"
                });

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
        }

        public class TestAddContactsToGroups
        {
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

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.AddContactsToGroups(new ContactToGroupRequest
                {
                    UserId = "2",
                    ContactIds = new List<ContactIdsRequest>() { new ContactIdsRequest() { ContactId = 3 } },
                    GroupIds = new List<GroupIdsRequest>() { new GroupIdsRequest() { GroupId = 100 } }
                });

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
        }

        public class TestDeleteContactFromGroup
        {
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

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.DeleteContactFromGroup(new DeleteContactFromGroupRequest
                {
                    GroupId = 100,
                    ContactIds = new List<DeleteContactIdFromGroupRequest>() { new DeleteContactIdFromGroupRequest() { ContactId = 3 } },
                });

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
        }

        public class TestDeleteGroupContact
        {
            [Test]
            public void Test_IdGroupNotExist_ReturnStatusCodeBadRequest()
            {
                // init information of user
                const int userId = 2;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.DeleteGroupContact(-11);

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

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.DeleteGroupContact(100);
                    
                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
        }

        public class TestPatchGroupName
        {
            [TestCase(-95, "Test")]
            [TestCase(95, "")]
            public void Test_IdGroupNotExist_EmptyGroupName_ReturnStatusCodeBadRequest(int id,string test)
            {
                // init information of user
                const int userId = 2;
                var role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
                var payload = new JwtToken
                {
                    Uid = userId,
                    Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                    Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
                };

                // add property to request
                var request = new HttpRequestMessage();
                request.Properties.Add("payload", payload);
                request.Properties.Add("role", role);

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.PatchGroupName(id,new RenameGroupContact
                {
                    GroupName = test
                });

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

                var controller = new GroupContactController();
                controller.Request = request;

                var res = controller.PatchGroupName(95,new RenameGroupContact
                {
                    GroupName = "Hoang Oke"
                });
                    
                Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
        }
    }
}