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
        public ResponseMessageResult GetListHome()
        {
            List<HomeContact> listCt = new List<HomeContact>();

            // get data from contact database
            int userId = ((JwtToken)Request.Properties["payload"]).Uid;
            var contact = db.contacts.Where(c => c.createdBy == userId).ToList();
            if (contact.Count == 0)
            {
                return Common.ResponseMessage.BadRequest("Faild to get contact");
            }

            // add data to listCt from var contact
            foreach (var c in contact)
            {
                HomeContact hc = new HomeContact();
                hc.Id = c.id;
                hc.ImgUrl = c.image_url;
                hc.Name = c.name;
                hc.JobTitle = c.job_title;
                hc.Company = c.company;
                hc.Flag = c.flag.name;
                hc.CreatedAt = c.create_date;
                listCt.Add(hc);
            }

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "",
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
            var contact = db.contacts.Where(c => c.id == id).FirstOrDefault();
            if (contact == null)
            {
                return Common.ResponseMessage.BadRequest("Faild to get contact");
            }

            List<string> listGr = new List<string>();
            Array.ForEach(contact.groups.ToArray(), g => { listGr.Add(g.name); });

            DetailContact dc = new DetailContact();
            dc.Id = contact.id;
            dc.ImgUrl = contact.image_url;
            dc.Name = contact.name;
            dc.JobTitle = contact.job_title;
            dc.Company = contact.company;
            dc.Flag = contact.flag?.name;
            dc.Phone = contact.phone;
            dc.Fax = contact.fax;
            dc.Email = contact.email;
            dc.Address = contact.address;
            dc.Website = contact.website;
            dc.GroupName = listGr.ToArray();
            dc.CreatedAt = contact.create_date;

            Console.Out.WriteLine("id: " + id);
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
        [Route("api/contact/add")]
        // [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager })]
        public ResponseMessageResult Post([FromBody] ContactRequest request)
        {
            DateTime dateCreated = DateTime.Now;
            string name = request.Name;
            string email = request.Email;
            string imageUrl = request.ImgUrl;
            string company = request.Company;
            string jobTitle = request.JobTitle;
            string phone = request.Mobile;
            string address = request.Address;
            string website = request.Website;
            string fax = request.Fax;

            if (Validator.Validator.CheckName(name) == false || Validator.Validator.CheckEmail(email) == false ||
                Validator.Validator.CheckUrl(imageUrl) == false ||
                Validator.Validator.CheckPhoneOrFax(phone) == false ||
                Validator.Validator.CheckInputLength(company) == false ||
                Validator.Validator.CheckInputLength(jobTitle) == false ||
                Validator.Validator.CheckInputLength(address) == false ||
                Validator.Validator.CheckInputLength(website) == false ||
                Validator.Validator.CheckPhoneOrFax(fax) == false)
            {
                return Common.ResponseMessage.BadRequest("Information is not valid");
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
                owner_id = 2,
                status_id = 2,
                isActive = true,
                create_date = dateCreated,
                createdBy = 2
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
        [Route("api/contact/update")]
        public ResponseMessageResult Put(int id, [FromBody] string value)
        {
            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.BadRequest,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "",
                }), Encoding.UTF8, "application/json")
            });
        }
    }
}