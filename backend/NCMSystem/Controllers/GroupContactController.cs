using NCMSystem.Filter;
using NCMSystem.Models;
using NCMSystem.Models.CallAPI;
using NCMSystem.Models.CallAPI.Group_Contact;
using NCMSystem.Models.CallAPI.Team;
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
            List<HomeGroupContact> listHomeGroupContact = new List<HomeGroupContact>();

            try
            {
                int userId = ((JwtToken)Request.Properties["payload"]).Uid;

                //find groups according to the logged in user
                List<group> listGroup = db.groups.Where(g => g.user_id == userId).ToList();

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
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
                    Data = listHomeGroupContact
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpGet]
        [Route("api/groups/{id}")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.Marketer })]
        public ResponseMessageResult GetGroupContactDetail(int id)
        {
            DetailGroupContact dgc = new DetailGroupContact();

            try
            {
                int userId = ((JwtToken)Request.Properties["payload"]).Uid;

                //get group from database with its id accordingly from the logged in user
                var group = db.groups.FirstOrDefault(g => g.id == id && g.user_id == userId);

                if (group == null)
                {
                    return new ResponseMessageResult(new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "C0015"
                        }), Encoding.UTF8, "application/json")
                    });
                }

                List<contact> contacts = group.contacts.ToList();

                List<ContactInGroup> listCtInGroup = new List<ContactInGroup>();

                dgc.GroupName = group.name;

                foreach (var c in contacts)
                {
                    ContactInGroup cig = new ContactInGroup();
                    cig.ContactId = c.id;
                    cig.ContactName = c.name;
                    cig.ImgUrl = c.image_url;
                    cig.JobTitle = c.job_title;
                    cig.ContactCompany = c.company;
                    cig.ContactCreatedAt = c.create_date;
                    listCtInGroup.Add(cig);
                }

                dgc.contacts = listCtInGroup;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
                    Data = dgc
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpGet]
        [Route("api/groups/search-groupcontact/{group_name}")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.Marketer })]
        public ResponseMessageResult SearchGroupContact(string group_name)
        {
            List<SearchGroupContact> listFoundGroup = new List<SearchGroupContact>();

            try
            {
                int userId = ((JwtToken)Request.Properties["payload"]).Uid;

                //find groups according to the logged in user
                List<group> listGroup = db.groups.Where(g => g.user_id == userId).ToList();

                //search for matched group contacts by names
                foreach (group group in listGroup)
                {
                    if (group.name.ToLower().Contains(group_name.ToLower()))
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
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
                    Data = listFoundGroup
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpGet]
        [Route("api/groups/search-contactingroupcontact/{group_id}/{valueToSearch}")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.Marketer })]
        public ResponseMessageResult SearchContactInGroupContact(int group_id, string valueToSearch)
        {
            List<ContactInGroup> listFoundContactsInGroup = new List<ContactInGroup>();

            try
            {
                int userId = ((JwtToken)Request.Properties["payload"]).Uid;

                //get group from database with its id accordingly by the logged in user
                var group = db.groups.FirstOrDefault(g => g.id == group_id && g.user_id == userId);

                if (group == null)
                {
                    return new ResponseMessageResult(new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "C0015"
                        }), Encoding.UTF8, "application/json")
                    });
                }

                List<contact> contacts = group.contacts.ToList();

                //search for matched group contacts by names
                foreach (contact c in contacts)
                {
                    string cName, cJobTitle = "", cCompany = "";
                    if (c.name == null)
                    {
                        cName = "";
                    }
                    else
                    {
                        cName = c.name;
                    }
                    
                    
                    if(c.job_title == null)
                    {
                        cJobTitle = "";
                    }
                    else
                    {
                        cJobTitle = c.job_title;
                    }
                    
                    if(c.company == null)
                    {
                        cCompany = "";
                    }
                    else
                    {
                        cCompany = c.company;
                    }

                    if (cName.ToLower().Contains(valueToSearch.ToLower()) || cJobTitle.ToLower().Contains(valueToSearch.ToLower()) ||
                    cCompany.ToLower().Contains(valueToSearch.ToLower()))
                    {
                        listFoundContactsInGroup.Add(new ContactInGroup()
                        {
                            ContactId = c.id,
                            ContactName = cName,
                            ImgUrl = c.image_url,
                            JobTitle = cJobTitle,
                            ContactCompany = cCompany,
                            ContactCreatedAt = c.create_date
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
                    Data = listFoundContactsInGroup
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpGet]
        [Route("api/groups/getcontactsavailableforgroup/{group_id}")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.Marketer })]
        public ResponseMessageResult GetContactsAvailableForAGroup(int group_id)
        {
            List<AvailableContactToGroup> availableContacts = new List<AvailableContactToGroup>();

            try
            {
                int userId = ((JwtToken)Request.Properties["payload"]).Uid;

                var selectedGroup = db.groups.Where(g => g.id == group_id && g.user_id == userId).FirstOrDefault();

                if (selectedGroup == null)
                {
                    return new ResponseMessageResult(new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "C0015"
                        }), Encoding.UTF8, "application/json")
                    });
                }

                //get list of contacts that the user has
                List<contact> listContact = db.contacts.Where(c => c.owner_id == userId).ToList();
                //get list of contacts in the selected group contact
                List<contact> listContactInGroup = selectedGroup.contacts.ToList();

                foreach (contact contact in listContact)
                {
                    if (!listContactInGroup.Contains(contact))
                    {
                        AvailableContactToGroup c = new AvailableContactToGroup();
                        c.ContactId = contact.id;
                        c.ContactName = contact.name;
                        c.ImgUrl = contact.image_url;
                        c.JobTitle = contact.job_title;
                        c.ContactCompany = contact.company;
                        c.ContactCreatedAt = contact.create_date;

                        availableContacts.Add(c);
                    }
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
                    Data = availableContacts
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

                 if (!Validator.Validator.CheckInputLengthGroupName(groupName))
                {
                    return new ResponseMessageResult(new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "C0017",
                        }), Encoding.UTF8, "application/json")
                    });
                }

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
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
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
                int userId = ((JwtToken)Request.Properties["payload"]).Uid;

                int groupId = request.GroupId;

                var group = db.groups.Where(g => g.user_id == userId && g.id == groupId).FirstOrDefault();

                if (group == null)
                {
                    return new ResponseMessageResult(new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "C0015",
                        }), Encoding.UTF8, "application/json")
                    });
                }

                List<ContactIdRequestToGroup> listContactIds = request.ListContactId;

                //get list of contacts in a Group Contact user chose to add to
                List<contact> contactListInGroupContact = group.contacts.ToList();

                //get list of contacts that the user has
                List<contact> contacts = db.contacts.Where(c => c.owner_id == userId).ToList();

                //list of contacts to add to group contact
                List<contact> selectedContacts = new List<contact>();

                foreach (ContactIdRequestToGroup cirtg in listContactIds)
                {
                    contact c = contactListInGroupContact.Find(c1 => c1.id == cirtg.ContactId);
                    //if there's no contact with same info as inputted contact
                    if (c == null)
                    {
                        //determines if the contact to add belongs to the logged in user
                        contact contactToAdd = contacts.Find(c1 => c1.id == cirtg.ContactId);
                        if (contactToAdd != null)
                        {
                            selectedContacts.Add(contactToAdd);
                        }
                    }
                }

                //if there's nothing to add
                if (selectedContacts.Count == 0)
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

                var selectedGroup = db.groups.Where(g => g.id == groupId).FirstOrDefault();
                foreach (contact contact in selectedContacts)
                {
                    selectedGroup.contacts.Add(contact);
                }

                db.SaveChanges();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
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
                int userId = ((JwtToken)Request.Properties["payload"]).Uid;

                //get selected contact and group that contains the selected contact
                group selectedGroup = db.groups.Where(g => g.id == request.GroupId && g.user_id == userId).FirstOrDefault();

                if (selectedGroup == null)
                {
                    return new ResponseMessageResult(new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "C0015"
                        }), Encoding.UTF8, "application/json")
                    });
                }
                //get contacts from the selected group contact
                List<contact> contacts = selectedGroup.contacts.ToList();

                //list of contact ids from JSON Postman
                List<DeleteContactIdFromGroupRequest> contactIds = request.ContactIds;

                //list of selected contacts according to contact ids to delete from group contact
                List<contact> selectedContacts = new List<contact>();

                foreach (DeleteContactIdFromGroupRequest dcifgr in contactIds)
                {
                    foreach (contact contact in contacts)
                    {
                        if (contact.id == dcifgr.ContactId)
                        {
                            selectedContacts.Add(contact);
                        }
                    }
                }

                if (selectedContacts.Count == 0)
                {
                    return new ResponseMessageResult(new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "C0014"
                        }), Encoding.UTF8, "application/json")
                    });
                }

                foreach (contact selected in selectedContacts)
                {
                    selectedGroup.contacts.Remove(selected);
                }

                db.SaveChanges();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success"
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
                int userId = ((JwtToken)Request.Properties["payload"]).Uid;

                //get group from database with group_id
                group selectedGroup = db.groups.Where(g => g.id == id && g.user_id == userId).FirstOrDefault();

                if (selectedGroup == null)
                {
                    return new ResponseMessageResult(new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "C0015"
                        }), Encoding.UTF8, "application/json")
                    });
                }

                selectedGroup.contacts.Clear();

                db.groups.Remove(selectedGroup);

                db.SaveChanges();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success"
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
                group group = db.groups.Where(g => g.id == id && g.user_id == userId).FirstOrDefault();

                if (group == null)
                {
                    return new ResponseMessageResult(new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "C0015"
                        }), Encoding.UTF8, "application/json")
                    });
                }

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
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success"
                }), Encoding.UTF8, "application/json")
            });
        }
    }
}
