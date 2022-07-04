using NCMSystem.Filter;
using NCMSystem.Models;
using NCMSystem.Models.CallAPI;
using NCMSystem.Models.CallAPI.Group_Contact;
using Newtonsoft.Json;
using Serilog;
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
            int userId = ((JwtToken)Request.Properties["payload"]).Uid;

            //find groups according to the logged in user
            List<group> listGroup = db.groups.Where(g => g.user_id == userId).ToList();
            List<HomeGroupContact> listHomeGroupContact = new List<HomeGroupContact>();
            try
            {
                foreach (group g in listGroup)
                {
                    HomeGroupContact hgc = new HomeGroupContact();
                    hgc.GroupName = g.name;
                    hgc.GroupId = g.id;
                    listHomeGroupContact.Add(hgc);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C00001");
                Log.CloseAndFlush();
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

        [HttpGet]
        [Route("api/groups/{id}")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.Marketer })]
        public ResponseMessageResult GetGroupContactDetail(int id)
        {
            //get group from database with its id accordingly
            var group = db.groups.FirstOrDefault(g => g.id == id);

            List<contact> contacts = group.contacts.ToList();

            List<ContactInGroup> listCtInGroup = new List<ContactInGroup>();

            DetailGroupContact dgc = new DetailGroupContact();
            dgc.GroupName = group.name;

            try
            {
                foreach (var c in contacts)
                {
                    ContactInGroup cig = new ContactInGroup();
                    cig.ContactName = c.name;
                    cig.JobTitle = c.job_title;
                    cig.ContactCompany = c.company;
                    cig.ContactCreatedAt = c.create_date;
                    listCtInGroup.Add(cig);
                }

                dgc.contacts = listCtInGroup;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C00001");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Get Group Contact Detail Successully",
                    Data = dgc
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpGet]
        [Route("api/groups/search-groupcontact/")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.Marketer })]
        public ResponseMessageResult SearchGroupContact([FromBody] SearchGroupContact request)
        {
            int userId = ((JwtToken)Request.Properties["payload"]).Uid;

            //find groups according to the logged in user
            List<group> listGroup = db.groups.Where(g => g.user_id == userId).ToList();
            List<SearchGroupContact> listFoundGroup = new List<SearchGroupContact>();

            try
            {
                //search for matched group contacts by names
                foreach (group group in listGroup)
                {
                    if (group.name.Contains(request.GroupName))
                    {
                        listFoundGroup.Add(new SearchGroupContact()
                        {
                            GroupName = group.name
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C00001");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Get Found Group Contacts Successully",
                    Data = listFoundGroup
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpGet]
        [Route("api/groups/search-contactingroupcontact/{id}")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.Marketer })]
        public ResponseMessageResult SearchContactInGroupContact(int id, [FromBody] SearchContactInGroupContact request)
        {
            //get group from database with its id accordingly
            var group = db.groups.FirstOrDefault(g => g.id == id);

            List<contact> contacts = group.contacts.ToList();

            List<ContactInGroup> listFoundContactsInGroup = new List<ContactInGroup>();

            try
            {
                //search for matched group contacts by names
                foreach (contact c in contacts)
                {
                    if (c.name.Contains(request.Value) || c.job_title.Contains(request.Value) ||
                        c.company.Contains(request.Value))
                    {
                        listFoundContactsInGroup.Add(new ContactInGroup()
                        {
                            ContactName = c.name,
                            JobTitle = c.job_title,
                            ContactCompany = c.company,
                            ContactCreatedAt = c.create_date
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C00001");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Get Found Contacts In Group Successully",
                    Data = listFoundContactsInGroup
                }), Encoding.UTF8, "application/json")
            });
        }

        //POST
        [HttpPost]
        [Route("api/groups/add-group")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.Marketer })]
        public ResponseMessageResult AddGroup([FromBody] GroupContactRequest request)
        {
            try
            {
                int userId = ((JwtToken)Request.Properties["payload"]).Uid;
                string groupName = request.GroupName;

                //get list of groups by the logged in user
                List<group> list = db.groups.Where(g => g.user_id == userId).ToList();

                foreach (group g in list)
                {
                    if (g.name.Equals(groupName))
                    {
                        return new ResponseMessageResult(new HttpResponseMessage()
                        {
                            StatusCode = System.Net.HttpStatusCode.OK,
                            Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                            {
                                Message = "C0007",
                            }), Encoding.UTF8, "application/json")
                        });
                    }
                }

                db.groups.Add(new group()
                {
                    name = groupName,
                    user_id = userId
                });

                db.SaveChanges();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C00001");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Add Group Successully",
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpPost]
        [Route("api/groups/add-contacttogroup")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.Marketer })]
        public ResponseMessageResult AddContactToGroup([FromBody] ContactToGroupRequest request)
        {
            try
            {
                int contactId = request.ContactId;
                int groupId = request.GroupId;

                //get list of contacts in a group by the logged in user
                List<contact> list = db.groups.Where(g => g.id == groupId).FirstOrDefault().contacts.ToList();

                foreach (contact c in list)
                {
                    if (c.id == contactId)
                    {
                        return new ResponseMessageResult(new HttpResponseMessage()
                        {
                            StatusCode = System.Net.HttpStatusCode.OK,
                            Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                            {
                                Message = "C0008",
                            }), Encoding.UTF8, "application/json")
                        });
                    }
                }

                var selectedGroup = db.groups.Where(g => g.id == groupId).FirstOrDefault();
                var selectedContact = db.contacts.Where(c => c.id == contactId).FirstOrDefault();

                selectedGroup.contacts.Add(selectedContact);

                db.SaveChanges();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C00001");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Add Contact to Group Successully",
                }), Encoding.UTF8, "application/json")
            });
        }

        //DELETE
        [HttpDelete]
        [Route("api/groups/delete-contactfromgroup/")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.Marketer })]
        public ResponseMessageResult DeleteContactFromGroup([FromBody] DeleteContactFromGroupRequest request)
        {
            try
            {
                //get selected contact and group that contains the selected contact
                group selectedGroup = db.groups.Where(g => g.id == request.GroupId).FirstOrDefault();
                contact selectedContact = db.contacts.Where(c => c.id == request.ContactId).FirstOrDefault();

                selectedGroup.contacts.Remove(selectedContact);

                db.SaveChanges();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C00001");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Delete Contact From Group Successully"
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpDelete]
        [Route("api/groups/delete-groupcontact/{id}")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.Marketer })]
        public ResponseMessageResult DeleteGroupContact(int id)
        {
            try
            {
                //get group from database with group_id
                group selectedGroup = db.groups.Where(g => g.id == id).FirstOrDefault();

                selectedGroup.contacts.Clear();

                db.groups.Remove(selectedGroup);

                db.SaveChanges();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C00001");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Delete Contact From Group Successully"
                }), Encoding.UTF8, "application/json")
            });
        }

        //PATCH
        [HttpPatch]
        [Route("api/groups/rename/{id}")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.Marketer })]
        public ResponseMessageResult PatchGroupName(int id, [FromBody] RenameGroupContact request)
        {
            try
            {
                int userId = ((JwtToken)Request.Properties["payload"]).Uid;
                //get a group selected by the logged in user by id
                group group = db.groups.Where(g => g.id == id).FirstOrDefault();

                List<group> list = db.groups.Where(g => g.user_id == userId).ToList();

                foreach (group g in list)
                {
                    if (g.name == request.GroupName)
                    {
                        return new ResponseMessageResult(new HttpResponseMessage()
                        {
                            StatusCode = System.Net.HttpStatusCode.OK,
                            Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                            {
                                Message = "C0007"
                            }), Encoding.UTF8, "application/json")
                        });
                    }
                }

                group.name = request.GroupName;

                db.SaveChanges();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C00001");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Change Group Name Successully"
                }), Encoding.UTF8, "application/json")
            });
        }
    }
}
