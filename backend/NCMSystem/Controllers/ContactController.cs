using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Results;
using NCMSystem.Filter;
using NCMSystem.Models;
using NCMSystem.Models.CallAPI;
using NCMSystem.Models.CallAPI.Contact;
using Newtonsoft.Json;
using Serilog;

namespace NCMSystem.Controllers
{
    public class ContactController : ApiController
    {
        private NCMSystemEntities db = new NCMSystemEntities();
        private LogException _log = new LogException();

        // GET
        [HttpGet]
        [Route("api/contacts")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager })]
        public ResponseMessageResult GetListHome(string sortBy = "create_date", int page = 1, string flag = "")
        {
            int pageSize = 10;
            if (page < 1) page = 1;
            int userId = ((JwtToken)Request.Properties["payload"]).Uid;

            List<HomeContact> listCt = new List<HomeContact>();
            try
            {
                var query = db.contacts.Where(c => c.createdBy == userId);
                if (!string.IsNullOrEmpty(flag))
                {
                    if (!flag.Equals("null"))
                    {
                        query = query.Where(c => c.flag_id.Equals(flag));
                    }
                }

                if (string.IsNullOrEmpty(sortBy))
                {
                    return Common.ResponseMessage.BadRequest("C0006");
                }

                if (sortBy.Equals("name"))
                {
                    query = query.OrderBy(x => x.name);
                }

                if (sortBy.Equals("company"))
                {
                    query = query.OrderBy(x => x.company);
                }

                if (sortBy.Equals("create_date"))
                {
                    query = query.OrderByDescending(x => x.create_date);
                }

                List<contact> contact;

                contact = query.Skip((page - 1) * pageSize)
                    .Take(pageSize).ToList();

                if (contact.Count != 0)
                {
                    foreach (var c in contact)
                    {
                        HomeContact hc = new HomeContact();
                        hc.Id = c.id;
                        hc.ImgUrl = c.image_url;
                        hc.Name = c.name;
                        hc.JobTitle = c.job_title;
                        hc.Company = c.company;
                        hc.Flag = c.flag_id;
                        hc.CreatedAt = c.create_date;
                        listCt.Add(hc);
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
                    Data = listCt
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpGet]
        [Route("api/contacts/{id}")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager })]
        public ResponseMessageResult GetDetail(int id)
        {
            List<string> listGr = new List<string>();
            DetailContact dc = new DetailContact();

            try
            {
                var contact = db.contacts.FirstOrDefault(c => c.id == id);
                if (contact == null)
                {
                    return Common.ResponseMessage.NotFound("C0002");
                }

                Array.ForEach(contact.groups.ToArray(), g => { listGr.Add(g.name); });

                string flag = contact.flag_id;
                if (flag != null && flag.Equals("null"))
                {
                    flag = null;
                }

                dc.Id = contact.id;
                dc.ImgUrl = contact.image_url;
                dc.Name = contact.name;
                dc.JobTitle = contact.job_title;
                dc.Company = contact.company;
                dc.Flag = flag;
                dc.Phone = contact.phone;
                dc.Fax = contact.fax;
                dc.Email = contact.email;
                dc.Address = contact.address;
                dc.Website = contact.website;
                dc.GroupName = listGr.ToArray();
                dc.Status = contact.status_id;
                dc.ReasonStatus = contact.reasonStatus;
                dc.CreatedAt = contact.create_date;
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
                    Message = "Get detail successfully",
                    Data = dc
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpGet]
        [Route("api/contacts/search")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager })]
        public ResponseMessageResult GetSearch(string type = "home", string value = "")
        {
            int pageSize = 10;
            int userId = ((JwtToken)Request.Properties["payload"]).Uid;

            List<SearchContact> listCt = new List<SearchContact>();

            try
            {
                var query = db.contacts.Where(c => c.createdBy == userId);
                if (value == null)
                {
                    value = "";
                }

                var draft = query;

                SearchContact sc = new SearchContact();

                if (type.Equals("home"))
                {
                    List<contact> listSearch;
                    draft = draft.Where(c => c.name.Contains(value));
                    listSearch = draft.Take(pageSize).ToList();
                    if (listSearch.Count != 0)
                    {
                        foreach (var c in listSearch)
                        {
                            sc = new SearchContact();
                            sc.Id = c.id;
                            sc.ImgUrl = c.image_url;
                            sc.Name = c.name;
                            sc.JobTitle = c.job_title;
                            sc.Company = c.company;
                            sc.Email = c.email;
                            sc.CreatedAt = c.create_date;
                            listCt.Add(sc);
                        }
                    }

                    // clear query
                    draft = query;
                    draft = draft.Where(c => c.company.Contains(value));
                    listSearch = draft.Take(pageSize).ToList();
                    if (listSearch.Count != 0)
                    {
                        foreach (var c in listSearch)
                        {
                            sc = new SearchContact();
                            sc.Id = c.id;
                            sc.ImgUrl = c.image_url;
                            sc.Name = c.name;
                            sc.JobTitle = c.job_title;
                            sc.Company = c.company;
                            sc.Email = c.email;
                            sc.CreatedAt = c.create_date;
                            listCt.Add(sc);
                        }
                    }

                    // clear query
                    draft = query;
                    draft = draft.Where(c => c.email.Contains(value));
                    listSearch = draft.Take(pageSize).ToList();
                    if (listSearch.Count != 0)
                    {
                        foreach (var c in listSearch)
                        {
                            sc = new SearchContact();
                            sc.Id = c.id;
                            sc.ImgUrl = c.image_url;
                            sc.Name = c.name;
                            sc.JobTitle = c.job_title;
                            sc.Company = c.company;
                            sc.Email = c.email;
                            sc.CreatedAt = c.create_date;
                            listCt.Add(sc);
                        }
                    }

                    draft = query;
                    draft = draft.Where(c => c.phone.Contains(value));
                    listSearch = draft.Take(pageSize).ToList();
                    if (listSearch.Count != 0)
                    {
                        foreach (var c in listSearch)
                        {
                            sc = new SearchContact();
                            sc.Id = c.id;
                            sc.ImgUrl = c.image_url;
                            sc.Name = c.name;
                            sc.JobTitle = c.job_title;
                            sc.Company = c.company;
                            sc.Email = c.email;
                            sc.CreatedAt = c.create_date;
                            listCt.Add(sc);
                        }
                    }
                }

                listCt = listCt.GroupBy(x => x.Id).Select(x => x.First()).OrderByDescending(x => x.CreatedAt).ToList();
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
                    Data = listCt
                }), Encoding.UTF8, "application/json")
            });
        }

        // POST
        [HttpPost]
        [Route("api/contacts")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager })]
        public ResponseMessageResult Post([FromBody] ContactRequest request)
        {
            int userId = ((JwtToken)Request.Properties["payload"]).Uid;
            DateTime dateCreated = DateTime.Now;
            string name = request.Name;
            string email = request.Email;
            string imageUrl = request.ImgUrl;
            string company = request.Company;
            string jobTitle = request.JobTitle;
            string phone = request.Phone;
            string address = request.Address;
            string website = request.Website;
            string fax = request.Fax;

            try
            {
                if (Validator.Validator.CheckName(name) == false || Validator.Validator.CheckEmail(email) == false ||
                    Validator.Validator.CheckUrl(imageUrl) == false ||
                    Validator.Validator.CheckPhoneOrFax(phone) == false ||
                    Validator.Validator.CheckEmptyvLength(company) == false ||
                    Validator.Validator.CheckInputLength(jobTitle) == false ||
                    Validator.Validator.CheckInputLength(address) == false ||
                    Validator.Validator.CheckInputLength(website) == false ||
                    Validator.Validator.CheckPhoneOrFax(fax) == false)
                {
                    return Common.ResponseMessage.BadRequest("Information is not valid");
                }

                // check if email is already exist
                var contact = db.contacts.FirstOrDefault(c => c.email == email);

                if (contact != null)
                {
                    if (contact.isActive)
                    {
                        return new ResponseMessageResult(new HttpResponseMessage()
                        {
                            StatusCode = System.Net.HttpStatusCode.OK,
                            Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                            {
                                Message = "D0001",
                                Data = new OwnerContact()
                                {
                                    Id = contact.id,
                                }
                            }), Encoding.UTF8, "application/json")
                        });
                    }

                    return new ResponseMessageResult(new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "D0002",
                            Data = new OwnerContact()
                            {
                                Id = contact.id,
                            }
                        }), Encoding.UTF8, "application/json")
                    });
                }

                db.contacts.Add(new contact()
                {
                    name = name,
                    email = email,
                    image_url = imageUrl,
                    company = company,
                    job_title = jobTitle,
                    phone = phone,
                    address = address,
                    website = website,
                    fax = fax,
                    owner_id = userId,
                    status_id = "S0002",
                    isActive = true,
                    create_date = dateCreated,
                    createdBy = userId
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
                StatusCode = System.Net.HttpStatusCode.Created,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "C0009",
                }), Encoding.UTF8, "application/json")
            });
        }

        // PUT
        [HttpPut]
        [Route("api/contacts/{id}")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager })]
        public ResponseMessageResult Put(int id, ContactRequest request)
        {
            try
            {
                var contact = db.contacts.FirstOrDefault(c => c.id == id);
                if (contact == null)
                {
                    return Common.ResponseMessage.NotFound("C0002");
                }

                string name = request.Name;
                string email = request.Email;
                string company = request.Company;
                string jobTitle = request.JobTitle;
                string phone = request.Phone;
                string address = request.Address;
                string website = request.Website;
                string fax = request.Fax;

                if (Validator.Validator.CheckName(name) == false || Validator.Validator.CheckEmail(email) == false ||
                    Validator.Validator.CheckPhoneOrFax(phone) == false ||
                    Validator.Validator.CheckEmptyvLength(company) == false ||
                    Validator.Validator.CheckInputLength(jobTitle) == false ||
                    Validator.Validator.CheckInputLength(address) == false ||
                    Validator.Validator.CheckInputLength(website) == false ||
                    Validator.Validator.CheckPhoneOrFax(fax) == false)
                {
                    return Common.ResponseMessage.BadRequest("C0005");
                }

                contact.name = name;
                contact.job_title = jobTitle;
                contact.company = company;
                contact.phone = phone;
                contact.fax = fax;
                contact.email = email;
                contact.address = address;
                contact.website = website;

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
                    Message = "C0010",
                }), Encoding.UTF8, "application/json")
            });
        }

        // PATCH
        [HttpPatch]
        [Route("api/contacts/flag/{id}")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager })]
        public ResponseMessageResult PatchFlag(int id, [FromBody] FlagContact requestFlag)
        {
            try
            {
                var contact = db.contacts.FirstOrDefault(c => c.id == id);
                if (contact == null)
                {
                    return Common.ResponseMessage.NotFound("C0002");
                }

                if (requestFlag.Flag != null)
                {
                    contact.flag_id = requestFlag.Flag;
                    db.SaveChanges();
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
                    Message = "F0005",
                }), Encoding.UTF8, "application/json")
            });
        }

        // PATCH
        [HttpPatch]
        [Route("api/contacts/status/{id}")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager })]
        public ResponseMessageResult PatchStatus(int id, [FromBody] StatusContact statusCt)
        {
            try
            {
                var contact = db.contacts.FirstOrDefault(c => c.id == id);
                if (contact == null)
                {
                    return Common.ResponseMessage.NotFound("C0002");
                }

                if (statusCt.Status == null)
                {
                    return Common.ResponseMessage.NotFound("S0004");
                }

                if (!statusCt.Status.Equals("S0002"))
                {
                    contact.status_id = statusCt.Status;
                    if (!Validator.Validator.CheckEmptyvLength(statusCt.ReasonStatus))
                    {
                        return Common.ResponseMessage.BadRequest("C0003");
                    }

                    contact.reasonStatus = statusCt.ReasonStatus;
                    db.SaveChanges();
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
                    Message = "S0005",
                }), Encoding.UTF8, "application/json")
            });
        }

        // PATCH
        [HttpPatch]
        [Route("api/contacts/de-active/{id}")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager })]
        public ResponseMessageResult PatchDeActive(int id, [FromBody] ReasonDaContact reasonDaContact)
        {
            try
            {
                var contact = db.contacts.FirstOrDefault(c => c.id == id);
                if (contact == null)
                {
                    return Common.ResponseMessage.NotFound("C0002");
                }

                if (string.IsNullOrEmpty(reasonDaContact.ReasonDa))
                {
                    return Common.ResponseMessage.BadRequest("C0004");
                }

                contact.isActive = false;
                contact.resonDeactive = reasonDaContact.ReasonDa;
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
                    Message = "C0011",
                }), Encoding.UTF8, "application/json")
            });
        }

        // PATCH
        [HttpPatch]
        [Route("api/contacts/active/{id}")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager })]
        public ResponseMessageResult PatchActive(int id)
        {
            try
            {
                var contact = db.contacts.FirstOrDefault(c => c.id == id);
                if (contact == null)
                {
                    return Common.ResponseMessage.NotFound("C0002");
                }

                contact.isActive = true;
                contact.resonDeactive = null;
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
                    Message = "C0012",
                }), Encoding.UTF8, "application/json")
            });
        }
    }
}