using NCMSystem.Filter;
using NCMSystem.Models;
using NCMSystem.Models.CallAPI;
using NCMSystem.Models.CallAPI.Group_Contact;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Results;

namespace NCMSystem.Controllers
{
    public class GroupContactController : ApiController
    {
        private NCMSystemEntities db = new NCMSystemEntities();

        //GET
        [HttpGet]
        [Route("api/groups")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.Marketer })]
        public ResponseMessageResult GetHomeListGroupContact()
        {
            int userId = ((JwtToken) Request.Properties["payload"]).Uid;

            List<group> listGroup = db.groups.Where(g => g.user_id == userId).ToList();
            List<HomeGroupContact> listHomeGroupContact = new List<HomeGroupContact>();
            if(listGroup.Count == 0)
            {
                return Common.ResponseMessage.BadRequest("No groups found");
            }
            foreach(group g in listGroup)
            {
                HomeGroupContact hgc = new HomeGroupContact();
                hgc.GroupName = g.name;
                listHomeGroupContact.Add(hgc);
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "List shown successfully",
                    Data = listHomeGroupContact
                }), Encoding.UTF8, "application/json")
            });
        }

        //POST
        [HttpPost]
        [Route("api/groups/addGroup")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.Marketer })]
        public ResponseMessageResult AddGroup([FromBody] GroupContactRequest request)
        {
            int userId = ((JwtToken) Request.Properties["payload"]).Uid;
            string groupName = request.GroupName;

            db.groups.Add(new group()
            {
                name = groupName,
                user_id = userId,
            });

            db.SaveChanges();

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Add Group Successully",
                }), Encoding.UTF8, "application/json")
            });
        }

        //POST
        [HttpPost]
        [Route("api/groups/addContactToGroup")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.Marketer })]
        public ResponseMessageResult AddContactToGroup([FromBody] ContactToGroupRequest request)
        {
            int contactId = request.ContactId;
            int groupId = request.GroupId;

            var selectedGroup = db.groups.Where(g => g.id == groupId).FirstOrDefault();
            var selectedContact = db.contacts.Where(c => c.id == contactId).FirstOrDefault();

            selectedGroup.contacts.Add(selectedContact);

            db.SaveChanges();

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Add Contact to Group Successully",
                }), Encoding.UTF8, "application/json")
            });
        }
    }
}
