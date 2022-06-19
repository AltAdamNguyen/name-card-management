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
        [Route("api/contact/view")]
        [JwtAuthorizeFilter ]
        public ResponseMessageResult Get(ContactRequest request)
        {
            List<ContactRequest> list = new List<ContactRequest>();
            
            // get data from database
            var data = db.contacts.Where(x => x.createdBy == 2).ToList();

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.BadRequest,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "",
                    Data = new ContactRequest()
                    {
                        
                    },
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
            string name = request.name;
            string email = request.email;
            string image_url = request.imgUrl;
            string company = request.company;
            string job_title = request.job_title;
            string phone = request.mobile;
            string address = request.address;
            string website = request.website;
            string fax = request.fax;

            if (Validator.Validator.CheckName(name) == false || Validator.Validator.CheckEmail(email) == false ||
                Validator.Validator.CheckUrl(image_url) == false ||
                Validator.Validator.CheckPhoneOrFax(phone) == false || Validator.Validator.CheckInputLength(company) == false ||
                Validator.Validator.CheckInputLength(job_title) == false || Validator.Validator.CheckInputLength(address) == false ||
                Validator.Validator.CheckInputLength(website) == false || Validator.Validator.CheckPhoneOrFax(fax) == false)
            {
                return Common.ResponseMessage.BadRequest("Information is not valid");
            }

            db.contacts.Add(new contact()
            {
                name = name,
                email = email,
                image_url = image_url,
                company = company,
                job_title = job_title,
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