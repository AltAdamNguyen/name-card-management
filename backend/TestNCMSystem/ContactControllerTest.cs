using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using NCMSystem.Controllers;
using NCMSystem.Models;
using NCMSystem.Filter;
using NUnit.Framework;

namespace TestNCMSystem
{
    [TestFixture]
    public class ContactControllerTest
    {
        private NCMSystemEntities db = new NCMSystemEntities(Environment.GetEnvironmentVariable("NCMSystemEntities"));

        [Test]
        public void ContactController_GetListHome_Success()
        {
            // init information of user
            int userId = 2;
            int? role = db.users.FirstOrDefault(x => x.id == userId)?.role_id;
            JwtToken payload = new JwtToken()
            {
                Uid = userId,
                Iat = DateTimeOffset.Now.ToUnixTimeSeconds(),
                Exp = DateTimeOffset.Now.AddMinutes(5).ToUnixTimeSeconds(),
            };

            // add property to request
            var request = new HttpRequestMessage();
            request.Properties.Add("payload", payload);
            request.Properties.Add("role", role);
            
            ContactController controller = new ContactController();
            controller.Request = request;
            var res = controller.GetListHome();
            
            Assert.AreEqual(HttpStatusCode.OK, res.Response.StatusCode);
        }
    }
}