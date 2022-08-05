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
    public class TeamControllerTest
    {
        private static readonly NCMSystemEntities db =
            new NCMSystemEntities(Environment.GetEnvironmentVariable("NCMSystemEntities"));
        
        public class TestGetListMember
        {
            [Test]
            public void Test_Success_ReturnListMembers()
            {
                // init information of user
                const int userId = 3;
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

                var controller = new TeamController();
                controller.Request = request;
                var res = controller.GetListMember();

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsTrue(json.ContainsKey("data"));
            }
        }

        public class TestGetContactOfMember
        {
            [TestCase(-9,1)]
            [TestCase(167,-1)]
            public void Test_ValuePageLessThan1_IdNotExist_ReturnListContacts(int id, int page)
            {
                // init information of user
                const int userId = 3;
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

                var controller = new TeamController();
                controller.Request = request;
                var res = controller.GetDetailMember(id,page);
                
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
            }
            
            [Test]
            public void Test_Success_ReturnListContacts()
            {
                // init information of user
                const int userId = 3;
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

                var controller = new TeamController();
                controller.Request = request;
                var res = controller.GetDetailMember(167,1);

                JObject json = Parse(res.Response.Content.ReadAsStringAsync().Result);
                Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
                Assert.IsTrue(json.ContainsKey("data"));
            }
        }

        public class TestGetSearchMember
        {
            [TestCase(null,ExpectedResult = HttpStatusCode.BadRequest)]
            [TestCase("alo",ExpectedResult = HttpStatusCode.OK)]
            public HttpStatusCode Test_Success_ReturnListMember(string value)
            {
                // init information of user
                const int userId = 3;
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

                var controller = new TeamController();
                controller.Request = request;
                var res = controller.GetSearchMember(value);

                Parse(res.Response.Content.ReadAsStringAsync().Result);
                return res.Response.StatusCode;
            }
        }
    }
}