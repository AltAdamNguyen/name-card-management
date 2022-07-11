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
        //QUAN TRONG
        private NCMSystemEntities db = new NCMSystemEntities(Environment.GetEnvironmentVariable("NCMSystemEntities"));

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
                    //if this contact is active
                    if (c.isActive)
                    {
                        cig.ContactId = c.id;
                        cig.ContactName = c.name;
                        cig.ImgUrl = c.image_url;
                        cig.JobTitle = c.job_title;
                        cig.ContactCompany = c.company;
                        cig.ContactCreatedAt = c.create_date;
                        listCtInGroup.Add(cig);
                    }
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
                    if (c.isActive)
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


                        if (c.job_title == null)
                        {
                            cJobTitle = "";
                        }
                        else
                        {
                            cJobTitle = c.job_title;
                        }

                        if (c.company == null)
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
        [Route("api/groups/get-contactsavailableforgroup/{group_id}")]
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

                user u = db.users.Where(u1 => u1.id == userId).FirstOrDefault();

                //get list of contacts that the user has
                List<contact> listContact = db.contacts.Where(c => c.owner_id == userId).ToList();

                //if the logged in user is a manager
                if (u.role_id == 2)
                {
                    List<MemberTeamGroupContact> listMember = null;
                    var mem = db.Database.SqlQuery<MemberTeamGroupContact>("exec user_recurse @SuperBoss_id = " + userId).ToList();
                    if (mem != null)
                    {
                        listMember = mem;
                        List<int> listMemberIds = new List<int>();

                        //get contacts from members of the manager
                        foreach (MemberTeamGroupContact mtgc in listMember)
                        {
                            listMemberIds.Add(mtgc.Id);
                        }

                        if (listMemberIds.Count > 0)
                        {
                            foreach (int id in listMemberIds)
                            {
                                List<contact> listContactInMember = db.contacts.Where(c => c.owner_id == id).ToList();
                                listContact.AddRange(listContactInMember);
                            }
                        }
                    }
                }

                //get list of contacts in the selected group contact
                List<contact> listContactInGroup = selectedGroup.contacts.ToList();

                foreach (contact contact in listContact)
                {
                    //if this contact is active
                    if (contact.isActive)
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
                            c.ContactOwnerId = contact.owner_id;

                            availableContacts.Add(c);
                        }
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

        [HttpGet]
        [Route("api/groups/get-groupsforcontact/{contact_id}")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.Marketer })]
        public ResponseMessageResult GetGroupsAvailableForContact(int contact_id)
        {
            //initialize list of groups that can add the requested contact
            List<AvailableGroupToContact> availableGroups = new List<AvailableGroupToContact>();

            try
            {
                int userId = ((JwtToken)Request.Properties["payload"]).Uid;

                user u = db.users.Where(u1 => u1.id == userId).FirstOrDefault();

                contact selectedContact = null;

                if (u.role_id == 2)
                {
                    List<MemberTeamGroupContact> listMember = null;
                    var mem = db.Database.SqlQuery<MemberTeamGroupContact>("exec user_recurse @SuperBoss_id = " + userId).ToList();
                    if (mem != null)
                    {
                        listMember = mem;
                        List<int> listMemberIds = new List<int>();

                        if (listMember.Count != 0)
                        {
                            foreach (MemberTeamGroupContact mtgc in listMember)
                            {
                                listMemberIds.Add(mtgc.Id);
                            }
                        }

                        foreach (int id in listMemberIds)
                        {
                            List<contact> listContactInMember = db.contacts.Where(c => c.owner_id == id).ToList();

                            foreach (contact c in listContactInMember)
                            {
                                if (c.id == contact_id)
                                {
                                    selectedContact = c;
                                    break;
                                }
                            }

                            if (selectedContact != null)
                            {
                                break;
                            }
                        }
                    }
                }

                else
                {
                    selectedContact = db.contacts.Where(c => c.owner_id == userId && c.id == contact_id).FirstOrDefault();
                }

                if (selectedContact == null)
                {
                    return new ResponseMessageResult(new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "C0016"
                        }), Encoding.UTF8, "application/json")
                    });
                }
                else if (!selectedContact.isActive)
                {
                    return new ResponseMessageResult(new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "C0020",
                        }), Encoding.UTF8, "application/json")
                    });
                }

                //get list of groups that the user has
                List<group> listGroups = db.groups.Where(g => g.user_id == userId).ToList();

                foreach (group g in listGroups)
                {
                    List<contact> listContacts = g.contacts.ToList();

                    if (listContacts.Contains(selectedContact))
                    {
                        continue;
                    }
                    else
                    {
                        AvailableGroupToContact agtc = new AvailableGroupToContact();
                        agtc.GroupName = g.name;
                        agtc.GroupId = g.id;
                        availableGroups.Add(agtc);
                    }
                }

                if (availableGroups.Count == 0)
                {
                    return new ResponseMessageResult(new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "C0021"
                        }), Encoding.UTF8, "application/json")
                    });
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
                    Data = availableGroups
                }), Encoding.UTF8, "application/json")
            });
        }

        //POST
        [HttpPost]
        [Route("api/groups/add-group")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.Marketer })]
        public ResponseMessageResult AddGroup([FromBody] GroupNameRequest request)
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
        [Route("api/groups/add-contactstogroups")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.Marketer })]
        public ResponseMessageResult AddContactsToGroups([FromBody] ContactToGroupRequest request)
        {
            try
            {
                int userIdLogin = ((JwtToken)Request.Properties["payload"]).Uid;

                string userIdRequest = request.UserId;

                List<ContactIdsRequest> listContactIdRequest = request.ContactIds;
                List<GroupIdsRequest> listGroupIdRequest = request.GroupIds;

                int successTime = 0;

                //if the contact is not by member of the team
                if (string.IsNullOrEmpty(userIdRequest))
                {
                    foreach (ContactIdsRequest cir in listContactIdRequest)
                    {
                        int contactId = cir.ContactId;
                        var contact = db.contacts.Where(c => c.owner_id == userIdLogin && c.id == contactId).FirstOrDefault();

                        if (contact == null)
                        {
                            continue;
                        }
                        else if (!contact.isActive)
                        {
                            continue;
                        }
                        else
                        {
                            foreach (GroupIdsRequest gir in listGroupIdRequest)
                            {
                                int groupId = gir.GroupId;
                                var group = db.groups.Where(g => g.user_id == userIdLogin && g.id == groupId).FirstOrDefault();

                                if (group == null)
                                {
                                    continue;
                                }
                                else
                                {
                                    List<contact> listContactsInGroup = group.contacts.ToList();
                                    if (!listContactsInGroup.Contains(contact))
                                    {
                                        group.contacts.Add(contact);
                                        successTime++;
                                    }
                                }
                            }
                        }
                    }
                }
                else
                {
                    int memberId = Convert.ToInt32(userIdRequest);

                    bool isMember = false;

                    var mem = db.Database.SqlQuery<MemberTeamGroupContact>("exec user_recurse @SuperBoss_id = " + userIdLogin).ToList();

                    if(mem != null)
                    {
                        List<MemberTeamGroupContact> listMember = mem;
                        foreach(MemberTeamGroupContact mtgc in listMember)
                        {
                            if(mtgc.Id == memberId)
                            {
                                isMember = true;
                            }
                        }
                    }

                    if (isMember)
                    {
                        foreach (ContactIdsRequest cir in listContactIdRequest)
                        {
                            int contactId = cir.ContactId;
                            var contact = db.contacts.Where(c => c.owner_id == memberId && c.id == contactId).FirstOrDefault();

                            if (contact == null)
                            {
                                continue;
                            }
                            else if (!contact.isActive)
                            {
                                continue;
                            }

                            foreach (GroupIdsRequest gir in listGroupIdRequest)
                            {
                                int groupId = gir.GroupId;
                                var group = db.groups.Where(g => g.user_id == userIdLogin && g.id == groupId).FirstOrDefault();

                                if (group == null)
                                {
                                    continue;
                                }
                                else
                                {
                                    List<contact> listContactsInGroup = group.contacts.ToList();
                                    if (!listContactsInGroup.Contains(contact))
                                    {
                                        group.contacts.Add(contact);
                                        successTime++;
                                    }
                                }
                            }
                        }
                    }
                    else
                    {
                        return new ResponseMessageResult(new HttpResponseMessage()
                        {
                            StatusCode = System.Net.HttpStatusCode.OK,
                            Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                            {
                                Message = "User Id is not a Member",
                            }), Encoding.UTF8, "application/json")
                        });
                    }
                }

                if (successTime == 0)
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

        public List<TeamResponse> MemberRecursive(List<MemberTeam> mem, int id)
        {
            List<TeamResponse> arrayChild = new List<TeamResponse>();
            foreach (var a in mem)
            {
                if (a.ManagerId == id)
                {
                    arrayChild.Add(new TeamResponse()
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Children = new List<TeamResponse>()
                    });
                }
            }

            if (arrayChild.Count != 0)
            {
                foreach (var a in arrayChild)
                {
                    a.Children = MemberRecursive(mem, a.Id);
                }
            }

            return arrayChild;
        }
    }
}
