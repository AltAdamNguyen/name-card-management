using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using NCMSystem.Controllers;
using NUnit.Framework;

namespace TestNCMSystem
{
    [TestFixture]
    public class ContactControllerTest
    {
        Token token = new Token();

        [Test]
        public void ContactController_GetListHome_Success()
        {
            //arrange
            var controller = new ContactController();
            DateTimeOffset dateCreateToken = DateTimeOffset.Now;
            DateTimeOffset dateExpireToken = dateCreateToken.AddMinutes(5);
            var tokenStr=token.GenerateToken(2, dateCreateToken.ToUnixTimeSeconds(), dateExpireToken.ToUnixTimeSeconds(), 1);
            Console.Out.WriteLine("token: " + tokenStr);
            //add token to request header
            var request = new HttpRequestMessage()
            {
                Method = HttpMethod.Get,
                Headers = { { "Authorization", "Bearer " + tokenStr } }
            };
            
            controller.Request = request;
            controller.Configuration = new HttpConfiguration();

            //act
            var result = controller.GetListHome("create_date",1,"");

            //assert
            Assert.AreEqual(result.Response.StatusCode, HttpStatusCode.OK);
        }
    }
}