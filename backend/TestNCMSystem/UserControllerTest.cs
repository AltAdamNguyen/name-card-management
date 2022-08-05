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
        public void Test_Login_MissingEmailAndPassword_ReturnStatusCodeBadRequest()
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
        public void Test_Login_MissingEmail_ReturnStatusCodeBadRequest()
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
        public void Test_Login_MissingPassword_ReturnStatusCodeBadRequest()
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
        public void Test_Login_UserNotFound_ReturnStatusCodeBadRequest()
        {
            //arrange
            var controller = new UserController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();

            //act
            var cc = controller.Login(new UserRequest()
            {
                Email = "study@nmtung.dev",
                Password = "Tung8864464@"
            });

            //assert
            Assert.AreEqual(cc.Response.StatusCode, HttpStatusCode.BadRequest);
        }

        [Test]
        public void Test_Login_Success_ReturnStatusCodeOK()
        {
            //arrange
            var controller = new UserController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();

            //act
            var cc = controller.Login(new UserRequest()
            {
                Email = "study@nmtung.dev",
                Password = "Trung123@"
            });

            JObject json = Parse(cc.Response.Content.ReadAsStringAsync().Result);
            //assert
            Assert.AreEqual(HttpStatusCode.OK, cc.Response.StatusCode);
            Assert.NotNull(json["data"]?["access_token"]);
            Assert.NotNull(json["data"]?["refresh_token"]);
        }

        [Test]
        public void Test_RefreshToken_MissingRefreshToken_ReturnStatusCodeBadRequest()
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
        public void Test_RefreshToken_Success_ReturnStatusCodeOK()
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