using System.Net;
using System.Net.Http;
using System.Web.Http;
using NCMSystem.Controllers;
using NCMSystem.Models.CallAPI.User.RefreshToken;
using NCMSystem.Models.CallAPI.User.UserLogin;
using Newtonsoft.Json.Linq;
using NUnit.Framework;
using static Newtonsoft.Json.Linq.JObject;

namespace TestNCMSystem
{
    [TestFixture]
    public class UserControllerTest
    {
        [Test]
        public void UserController_Login_MissingEmailAndPassword()
        {
            //arrange
            var controller = new UserController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();

            //act
            var cc = controller.Login(new UserRequest()
            {
            });

            //assert
            Assert.AreEqual(cc.Response.StatusCode, HttpStatusCode.BadRequest);
        }

        [Test]
        public void UserController_Login_MissingEmail()
        {
            //arrange
            var controller = new UserController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();

            //act
            var cc = controller.Login(new UserRequest()
            {
                Password = "Tung88644264@"
            });

            //assert
            Assert.AreEqual(cc.Response.StatusCode, HttpStatusCode.BadRequest);
        }

        [Test]
        public void UserController_Login_MissingPassword()
        {
            //arrange
            var controller = new UserController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();

            //act
            var cc = controller.Login(new UserRequest()
            {
                Email = "nmtung.study@gmail.com"
            });

            //assert
            Assert.AreEqual(cc.Response.StatusCode, HttpStatusCode.BadRequest);
        }

        [Test]
        public void UserController_Login_UserNotFound()
        {
            //arrange
            var controller = new UserController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();

            //act
            var cc = controller.Login(new UserRequest()
            {
                Email = "nmtung.stuy@gmail.com",
                Password = "Tung8864464@"
            });

            //assert
            Assert.AreEqual(cc.Response.StatusCode, HttpStatusCode.BadRequest);
        }

        [Test]
        public void UserController_Login_Success()
        {
            //arrange
            var controller = new UserController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();

            //act
            var cc = controller.Login(new UserRequest()
            {
                Email = "nmtung.study@gmail.com",
                Password = "Tung88644264@"
            });

            JObject json = Parse(cc.Response.Content.ReadAsStringAsync().Result);
            //assert
            Assert.AreEqual(cc.Response.StatusCode, HttpStatusCode.OK);
            Assert.NotNull(json["data"]?["access_token"]);
            Assert.NotNull(json["data"]?["refresh_token"]);
        }

        [Test]
        public void UserController_RefreshToken_MissingRefreshToken()
        {
            //arrange
            var controller = new UserController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();

            //act
            var cc = controller.PostRefreshToken(new RefreshTokenRequest()
            {
            });

            //assert
            Assert.AreEqual(cc.Response.StatusCode, HttpStatusCode.BadRequest);
        }

        [Test]
        public void UserController_RefreshToken_Success()
        {
            //arrange
            var controller = new UserController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();

            //act
            var cc = controller.PostRefreshToken(new RefreshTokenRequest()
            {
                RefreshToken =
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMsImlhdCI6MTY1ODQxMzkzNCwiZXhwIjoxNjYxMDkyMzM0fQ.ztwplji1yReNVOJ1g4T1bvQhZUUjiekXD9_iHZNpR0Y"
            });

            //assert
            Assert.AreEqual(cc.Response.StatusCode, HttpStatusCode.OK);
        }
    }
}