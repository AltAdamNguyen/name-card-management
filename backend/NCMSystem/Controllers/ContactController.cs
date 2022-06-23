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

namespace NCMSystem.Controllers
{
    public class ContactController : ApiController
    {
        private NCMSystemEntities db = new NCMSystemEntities();

        // GET
        [HttpGet]
        [Route("api/contacts")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager })]
        public ResponseMessageResult GetListHome(string sortBy = "create_date", int page = 1, string flag = "null")
        {
            int pageSize = 10;
            if (page < 1) page = 1;
            int userId = ((JwtToken)Request.Properties["payload"]).Uid;

            List<HomeContact> listCt = new List<HomeContact>();
            var query = db.contacts.Where(c => c.createdBy == userId);
            if (!flag.Equals("null"))
            {
                query = query.Where(c => c.flag_id.Equals(flag));
            }

            if (sortBy.Equals("name"))
            {
                query = query.OrderBy(x => x.name);
            }

            if (sortBy.Equals("company"))
            {
                query = query.OrderBy(x => x.create_date);
            }

            if (sortBy.Equals("create_date"))
            {
                query = query.OrderBy(x => x.create_date);
            }

            var contact = query.Skip((page - 1) * pageSize)
                .Take(pageSize).ToList();

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
            // get data from contact database
            var contact = db.contacts.FirstOrDefault(c => c.id == id);
            if (contact == null)
            {
                return Common.ResponseMessage.BadRequest("Failed to get contact");
            }


            List<string> listGr = new List<string>();
            Array.ForEach(contact.groups.ToArray(), g => { listGr.Add(g.name); });

            DetailContact dc = new DetailContact();
            dc.Id = contact.id;
            dc.ImgUrl = contact.image_url;
            dc.Name = contact.name;
            dc.JobTitle = contact.job_title;
            dc.Company = contact.company;
            dc.Flag = contact.flag_id;
            dc.Phone = contact.phone;
            dc.Fax = contact.fax;
            dc.Email = contact.email;
            dc.Address = contact.address;
            dc.Website = contact.website;
            dc.GroupName = listGr.ToArray();
            dc.Status = contact.status_id;
            dc.ReasonStatus = contact.reasonStatus;
            dc.CreatedAt = contact.create_date;

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

            if (Validator.Validator.CheckName(name) == false || Validator.Validator.CheckEmail(email) == false ||
                Validator.Validator.CheckUrl(imageUrl) == false ||
                Validator.Validator.CheckPhoneOrFax(phone) == false ||
                Validator.Validator.CheckCompany(company) == false ||
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
                            Message = "Request update contact",
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
                        Message = "Request active and update contact",
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

            try
            {
                db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.Created,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Add Successfully",
                }), Encoding.UTF8, "application/json")
            });
        }

        // PUT
        [HttpPut]
        [Route("api/contacts/{id}")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager })]
        public ResponseMessageResult Put(int id, ContactRequest request)
        {
            var contact = db.contacts.FirstOrDefault(c => c.id == id);
            if (contact == null)
            {
                return Common.ResponseMessage.BadRequest("Failed to get contact");
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
                Validator.Validator.CheckInputLength(company) == false ||
                Validator.Validator.CheckInputLength(jobTitle) == false ||
                Validator.Validator.CheckInputLength(address) == false ||
                Validator.Validator.CheckInputLength(website) == false ||
                Validator.Validator.CheckPhoneOrFax(fax) == false)
            {
                return Common.ResponseMessage.BadRequest("Information is not valid");
            }

            contact.name = name;
            contact.job_title = jobTitle;
            contact.company = company;
            contact.phone = phone;
            contact.fax = fax;
            contact.email = email;
            contact.address = address;
            contact.website = website;

            try
            {
                db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Update Successfully",
                }), Encoding.UTF8, "application/json")
            });
        }
    }
}