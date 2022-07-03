using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using NCMSystem.Controllers;
using NUnit.Framework;
using NCMSystem.Models;
using Jose;
using NCMSystem.Models.CallAPI.Group_Contact;

namespace TestNCMSystem
{
    [TestFixture]
    public class GroupContactControllerTest
    {
        private user user;
        NCMSystemEntities db = new NCMSystemEntities();

        [SetUp]
        public void Setup()
        {
            string email = "tung@gmail.com";
            string password = "Tung123@";

            user = db.users.FirstOrDefault(x => x.email == email && x.password == password);
        }

        [Test]
        public void GroupContactController_AddGroup_DuplicateGroupName()
        {
            //arrange
            var controller = new GroupContactController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();

            //act
            var cc = controller.AddGroup(new GroupContactRequest()
            {
                GroupName = "Test Group"
            });

            //assert
            Assert.AreEqual(cc.Response.StatusCode, HttpStatusCode.BadRequest);
        }

        [Test]
        public void GroupContactController_AddContactToGroup_DuplicateContactInGroup()
        {
            //arrange
            var controller = new GroupContactController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();

            //act
            var cc = controller.AddContactToGroup(new ContactToGroupRequest()
            {
                GroupId = 1,
                ContactId = 6
            });

            //assert
            Assert.AreEqual(cc.Response.StatusCode, HttpStatusCode.BadRequest);
        }

        [Test]
        public void GroupContactController_PatchGroupName_DuplicateGroupName()
        {
            //arrange
            var controller = new GroupContactController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();

            //act
            var cc = controller.PatchGroupName(1, new RenameGroupContact()
            {
                GroupName = "Rin Cult"
            });

            //assert
            Assert.AreEqual(cc.Response.StatusCode, HttpStatusCode.BadRequest);
        }
    }
}
        

        

    


