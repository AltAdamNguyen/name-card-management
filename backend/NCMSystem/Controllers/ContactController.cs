using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Results;
using ClosedXML.Excel;
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
        private NCMSystemEntities db = new NCMSystemEntities(Environment.GetEnvironmentVariable("NCMSystemEntities"));
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
                var query = db.contacts.Where(c => c.createdBy == userId && c.isActive == true);
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
                        var rq = db.requests.FirstOrDefault(r => r.new_contact_id == c.id);

                        HomeContact hc = new HomeContact
                        {
                            Id = c.id,
                            ImgUrl = c.image_url,
                            Name = c.name,
                            JobTitle = c.job_title,
                            Company = c.company,
                            Flag = c.flag_id,
                            Owner = c.owner_id,
                            CreateBy = c.createdBy,
                            CreatedAt = c.create_date,
                            Request = rq?.status
                        };
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
        [Route("api/contacts/de-active")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager })]
        public ResponseMessageResult GetListDaContact(int page = 1)
        {
            int pageSize = 10;
            if (page < 1) page = 1;
            int userId = ((JwtToken)Request.Properties["payload"]).Uid;

            List<DaContact> listCt = new List<DaContact>();
            try
            {
                var contact = db.contacts.Where(c => c.createdBy == userId && c.isActive == false)
                    .OrderByDescending(x => x.create_date).Skip((page - 1) * pageSize)
                    .Take(pageSize).ToList();

                if (contact.Count != 0)
                {
                    foreach (var c in contact)
                    {
                        DaContact dc = new DaContact
                        {
                            Id = c.id,
                            ImgUrl = c.image_url,
                            Name = c.name,
                            JobTitle = c.job_title,
                            Company = c.company,
                            ReasonDa = c.reason_deactive,
                            CreatedAt = c.create_date
                        };
                        listCt.Add(dc);
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
        [Route("api/contacts/transfer-list")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager })]
        public ResponseMessageResult GetListTransferContact(string sortBy = "create_date", int page = 1)
        {
            int pageSize = 10;
            if (page < 1) page = 1;
            int userId = ((JwtToken)Request.Properties["payload"]).Uid;

            List<HomeContact> listCt = new List<HomeContact>();
            try
            {
                var contact = db.contacts
                    .Where(c => c.owner_id == userId && c.createdBy == userId && c.isActive == true)
                    .OrderByDescending(x => x.create_date).Skip((page - 1) * pageSize)
                    .Take(pageSize).ToList();

                if (contact.Count != 0)
                {
                    foreach (var c in contact)
                    {
                        HomeContact hc = new HomeContact
                        {
                            Id = c.id,
                            ImgUrl = c.image_url,
                            Name = c.name,
                            JobTitle = c.job_title,
                            Company = c.company,
                            CreatedAt = c.create_date,
                        };
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
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.SaleDirector })]
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

                if (contact.owner_id != contact.createdBy)
                {
                    var existCt = db.contacts.FirstOrDefault(u => u.email == contact.email);
                    return new ResponseMessageResult(new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "Success",
                            Data = new
                            {
                                name = contact.name,
                                company = contact.company,
                                owner_id = contact.owner_id,
                                createdBy = contact.createdBy,
                                id = existCt?.id,
                                idDuplicate = contact.id,
                                owner = db.users.FirstOrDefault(u => u.id == contact.owner_id)?.name,
                            }
                        }), Encoding.UTF8, "application/json")
                    });
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
                dc.Owner = contact.owner_id;
                dc.CreateBy = contact.createdBy;
                dc.ReasonStatus = contact.reason_status;
                dc.CreatedAt = contact.create_date;
                dc.Note = contact.note;
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
                    Data = dc
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpGet]
        [Route("api/contacts/search")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.SaleDirector })]
        public ResponseMessageResult GetSearch(string value = "", int? userId = 0)
        {
            if (userId <= 0 || userId == null)
            {
                userId = ((JwtToken)Request.Properties["payload"]).Uid;
            }

            List<SearchContact> listCt = new List<SearchContact>();

            try
            {
                var query = db.contacts.Where(c => c.createdBy == userId && c.isActive == true);

                if (value == null)
                {
                    value = "";
                }

                listCt = SearchContacts(listCt, value, query);
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
        [Route("api/contacts/search-list-transfer")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.SaleDirector })]
        public ResponseMessageResult GetSearchListTransfer(string value = "")
        {
            int userId = ((JwtToken)Request.Properties["payload"]).Uid;

            List<SearchContact> listCt = new List<SearchContact>();

            try
            {
                var query = db.contacts.Where(c => c.owner_id == userId && c.createdBy == userId && c.isActive == true);

                if (value == null)
                {
                    value = "";
                }

                listCt = SearchContacts(listCt, value, query);
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

        public List<SearchContact> SearchContacts(List<SearchContact> listCt, string value, IQueryable<contact> query)
        {
            var draft = query;
            try
            {
                SearchContact sc;
                foreach (var c in draft)
                {
                    if (RemoveSign4VietnameseString(c.name)
                        .Contains(RemoveSign4VietnameseString(value.Trim())))
                    {
                        var rq = db.requests.FirstOrDefault(r => r.new_contact_id == c.id);
                        sc = new SearchContact
                        {
                            Id = c.id,
                            ImgUrl = c.image_url,
                            Name = c.name,
                            JobTitle = c.job_title,
                            Company = c.company,
                            Email = c.email,
                            Status = c.status_id,
                            Owner = c.owner_id,
                            CreateBy = c.createdBy,
                            Request = rq?.status,
                            Flag = (c.flag_id != null && c.flag_id.Equals("null")) ? null : c.flag_id,
                            CreatedAt = c.create_date
                        };
                        listCt.Add(sc);
                    }
                }

                // clear query
                draft = query;
                foreach (var c in draft)
                {
                    if (RemoveSign4VietnameseString(c.name)
                        .Contains(RemoveSign4VietnameseString(value.Trim())))
                    {
                        var rq = db.requests.FirstOrDefault(r => r.new_contact_id == c.id);
                        sc = new SearchContact
                        {
                            Id = c.id,
                            ImgUrl = c.image_url,
                            Name = c.name,
                            JobTitle = c.job_title,
                            Company = c.company,
                            Email = c.email,
                            Status = c.status_id,
                            Owner = c.owner_id,
                            CreateBy = c.createdBy,
                            Request = rq?.status,
                            Flag = (c.flag_id != null && c.flag_id.Equals("null")) ? null : c.flag_id,
                            CreatedAt = c.create_date
                        };
                        listCt.Add(sc);
                    }
                }

                draft = query;
                draft = draft.Where(c => c.email.Trim().ToLower().Contains(value.Trim().ToLower()));
                var listSearch = draft.ToList();
                if (listSearch.Count != 0)
                {
                    foreach (var c in listSearch)
                    {
                        var rq = db.requests.FirstOrDefault(r => r.new_contact_id == c.id);
                        sc = new SearchContact
                        {
                            Id = c.id,
                            ImgUrl = c.image_url,
                            Name = c.name,
                            JobTitle = c.job_title,
                            Company = c.company,
                            Email = c.email,
                            Status = c.status_id,
                            Owner = c.owner_id,
                            CreateBy = c.createdBy,
                            Request = rq?.status,
                            Flag = (c.flag_id != null && c.flag_id.Equals("null")) ? null : c.flag_id,
                            CreatedAt = c.create_date
                        };
                        listCt.Add(sc);
                    }
                }

                draft = query;
                draft = draft.Where(c => c.phone.Trim().Contains(value.Trim().ToLower()));
                listSearch = draft.ToList();
                if (listSearch.Count != 0)
                {
                    foreach (var c in listSearch)
                    {
                        var rq = db.requests.FirstOrDefault(r => r.new_contact_id == c.id);
                        sc = new SearchContact
                        {
                            Id = c.id,
                            ImgUrl = c.image_url,
                            Name = c.name,
                            JobTitle = c.job_title,
                            Company = c.company,
                            Email = c.email,
                            Status = c.status_id,
                            Owner = c.owner_id,
                            CreateBy = c.createdBy,
                            Request = rq?.status,
                            Flag = (c.flag_id != null && c.flag_id.Equals("null")) ? null : c.flag_id,
                            CreatedAt = c.create_date
                        };
                        listCt.Add(sc);
                    }
                }

                listCt = listCt.GroupBy(x => x.Id).Select(x => x.First()).OrderByDescending(x => x.CreatedAt).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
            }

            return listCt;
        }

        private static readonly string[] VietnameseSigns = new string[]
        {
            "aAeEoOuUiIdDyYBbCcDdFfGgHhJjKkLlMmNnPpQqRrSsTtVvWwXxYyZz",

            "áàạảãâấầậẩẫăắằặẳẵ",

            "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",

            "éèẹẻẽêếềệểễ",

            "ÉÈẸẺẼÊẾỀỆỂỄ",

            "óòọỏõôốồộổỗơớờợởỡ",

            "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",

            "úùụủũưứừựửữ",

            "ÚÙỤỦŨƯỨỪỰỬỮ",

            "íìịỉĩ",

            "ÍÌỊỈĨ",

            "đ",

            "Đ",

            "ýỳỵỷỹ",

            "ÝỲỴỶỸ"
        };

        private static string RemoveSign4VietnameseString(string str)
        {
            for (int i = 1; i < VietnameseSigns.Length; i++)
            {
                for (int j = 0; j < VietnameseSigns[i].Length; j++)
                    str = str.Replace(VietnameseSigns[i][j], VietnameseSigns[0][i - 1]);
            }

            return str.ToLower();
        }

        [HttpGet]
        [Route("api/contacts/search/de-active")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.SaleDirector })]
        public ResponseMessageResult GetSearchDa(string value = "")
        {
            int userId = ((JwtToken)Request.Properties["payload"]).Uid;

            List<DaContact> listCt = new List<DaContact>();

            try
            {
                var query = db.contacts.Where(c => c.createdBy == userId && c.isActive == false);
                if (value == null)
                {
                    value = "";
                }

                var draft = query;

                DaContact da;

                List<contact> listSearch;
                draft = draft.Where(c => c.name.Contains(value));
                listSearch = draft.ToList();
                if (listSearch.Count != 0)
                {
                    foreach (var c in listSearch)
                    {
                        da = new DaContact
                        {
                            Id = c.id,
                            ImgUrl = c.image_url,
                            Name = c.name,
                            JobTitle = c.job_title,
                            Company = c.company,
                            ReasonDa = c.reason_deactive,
                            CreatedAt = c.create_date
                        };
                        listCt.Add(da);
                    }
                }

                // clear query
                draft = query;
                draft = draft.Where(c => c.company.Contains(value));
                listSearch = draft.ToList();
                if (listSearch.Count != 0)
                {
                    foreach (var c in listSearch)
                    {
                        da = new DaContact
                        {
                            Id = c.id,
                            ImgUrl = c.image_url,
                            Name = c.name,
                            JobTitle = c.job_title,
                            Company = c.company,
                            ReasonDa = c.reason_deactive,
                            CreatedAt = c.create_date
                        };
                        listCt.Add(da);
                    }
                }

                // clear query
                draft = query;
                draft = draft.Where(c => c.email.Contains(value));
                listSearch = draft.ToList();
                if (listSearch.Count != 0)
                {
                    foreach (var c in listSearch)
                    {
                        da = new DaContact
                        {
                            Id = c.id,
                            ImgUrl = c.image_url,
                            Name = c.name,
                            JobTitle = c.job_title,
                            Company = c.company,
                            ReasonDa = c.reason_deactive,
                            CreatedAt = c.create_date
                        };
                        listCt.Add(da);
                    }
                }

                draft = query;
                draft = draft.Where(c => c.phone.Contains(value));
                listSearch = draft.ToList();
                if (listSearch.Count != 0)
                {
                    foreach (var c in listSearch)
                    {
                        da = new DaContact
                        {
                            Id = c.id,
                            ImgUrl = c.image_url,
                            Name = c.name,
                            JobTitle = c.job_title,
                            Company = c.company,
                            ReasonDa = c.reason_deactive,
                            CreatedAt = c.create_date
                        };
                        listCt.Add(da);
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
        public ResponseMessageResult PostAddContact([FromBody] ContactRequest request)
        {
            int userId = ((JwtToken)Request.Properties["payload"]).Uid;
            DateTime dateCreated = DateTime.Now;
            string name = request.Name;
            string email = request.Email;
            string imageUrl = request.ImgUrl;

            if (imageUrl == null || imageUrl.Equals(""))
            {
                imageUrl = AppDomain.CurrentDomain.BaseDirectory + "Images\\noImage.jpg";
            }

            string company = request.Company;
            string jobTitle = request.JobTitle;
            string phone = request.Phone;
            string address = request.Address;
            string website = request.Website;
            string fax = request.Fax;

            var newCt = new contact();
            try
            {
                if (Validator.Validator.CheckName(name) == false || Validator.Validator.CheckEmail(email) == false ||
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
                    var userOwner = db.users.FirstOrDefault(c => c.id == contact.owner_id);
                    if (userOwner == null)
                    {
                        return Common.ResponseMessage.NotFound("C0001");
                    }
                }

                if (contact != null && contact.owner_id == userId)
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
                                    Owner = contact.user.name
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
                                Owner = contact.user.name
                            }
                        }), Encoding.UTF8, "application/json")
                    });
                }

                if (contact != null)
                {
                    newCt = db.contacts.Add(new contact()
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
                        owner_id = contact.owner_id,
                        status_id = "S0002",
                        isActive = true,
                        create_date = dateCreated,
                        createdBy = userId,
                        note = request.Note
                    });

                    db.SaveChanges();

                    return new ResponseMessageResult(new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "D0003",
                            Data = new OwnerContact()
                            {
                                Id = contact.id,
                                IdDuplicate = newCt.id,
                                Owner = contact.user.name
                            }
                        }), Encoding.UTF8, "application/json")
                    });
                }

                newCt = db.contacts.Add(new contact()
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
                    createdBy = userId,
                    note = request.Note
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
                    Message = "C0009",
                    Data = new
                    {
                        id = newCt.id
                    }
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpPost]
        [Route("api/contacts/export")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.SaleDirector })]
        public ResponseMessageResult ExportContact([FromBody] ExportRequest eRq)
        {
            var wbook = new XLWorkbook();
            int userId = ((JwtToken)Request.Properties["payload"]).Uid;
            var user = db.users.FirstOrDefault(u => u.id == userId);
            if (user == null)
            {
                return Common.ResponseMessage.NotFound("C0018");
            }

            DateTime dateCreated = DateTime.Now;
            if (eRq.ArrayId == null || eRq.ArrayId.Length == 0)
            {
                return Common.ResponseMessage.BadRequest("C0018");
            }

            string fileName = AppDomain.CurrentDomain.BaseDirectory + "Files\\ExportContact_" +
                              dateCreated.ToString("M-d-yyyy") + ".xlsx";
            var ws = wbook.Worksheets.Add("Contacts");

            string[] headers =
            {
                "Name", "Email", "Company", "Job Title", "Phone", "Address", "Website", "Fax", "Note", "Create Date",
                "Created By"
            };
            int row = 1;
            int col = 1;
            foreach (var header in headers)
            {
                ws.Cell(row, col).Value = header;
                ws.Cell(row, col).Style.Fill.BackgroundColor = XLColor.BabyBlue;
                ws.Column(col).Width = 20;
                col++;
            }

            row++;
            col = 1;

            foreach (var id in eRq.ArrayId)
            {
                List<contact> contact = db.contacts.Where(c => c.createdBy == id).ToList();
                if (contact.Count > 0)
                {
                    foreach (var c in contact)
                    {
                        ws.Cell(row, col).Value = c.name;
                        col++;
                        ws.Cell(row, col).Value = c.email;
                        col++;
                        ws.Cell(row, col).Value = c.company;
                        col++;
                        ws.Cell(row, col).Value = c.job_title;
                        col++;
                        ws.Cell(row, col).SetValue(Convert.ToString(c.phone));
                        col++;
                        ws.Cell(row, col).Value = c.address;
                        col++;
                        ws.Cell(row, col).Value = c.website;
                        col++;
                        ws.Cell(row, col).SetValue(Convert.ToString(c.fax));
                        col++;
                        ws.Cell(row, col).Value = c.note;
                        col++;
                        ws.Cell(row, col).Value = c.create_date;
                        col++;
                        ws.Cell(row, col).Value = c.user.name;
                        row++;
                        col = 1;
                    }
                }

                row++;
                col = 1;
            }

            ws.Columns().AdjustToContents();
            wbook.SaveAs(fileName);
            SendGridConfig.SendExportFile(user.email,
                $"https://{Request.RequestUri.Host}/Files/ExportContact_{dateCreated:M-d-yyyy}.xlsx");

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Success",
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpPatch]
        [Route("api/contacts/transfer")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager })]
        public ResponseMessageResult TransferOwnContact([FromBody] TransferContact tranCt)
        {
            string email = tranCt.TransferTo ?? "";

            var user = db.users.FirstOrDefault(u => u.email == email);
            if (user == null)
            {
                return Common.ResponseMessage.BadRequest("C0018");
            }

            foreach (var ct in tranCt.ContactIds)
            {
                var ctId = int.Parse(ct);
                var contact = db.contacts.FirstOrDefault(c => c.id == ctId);
                if (contact != null)
                {
                    contact.groups.Clear();
                    contact.status_id = "S0002";
                    contact.note = null;
                    contact.flag_id = null;
                    contact.owner_id = user.id;
                    contact.createdBy = user.id;
                    db.SaveChanges();
                }
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

        [HttpGet]
        [Route("api/contacts/request/{id}/{idDuplicate}")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager })]
        public ResponseMessageResult RequestTransferContact(int id = 0, int idDuplicate = 0)
        {
            int userId = ((JwtToken)Request.Properties["payload"]).Uid;

            DateTime dateCreated = DateTime.Now;
            if (id < 0) id = 0;
            if (idDuplicate < 0) idDuplicate = 0;

            var rq = new request();
            try
            {
                var newCt = db.contacts.FirstOrDefault(c => c.id == idDuplicate);
                if (newCt == null)
                {
                    return Common.ResponseMessage.BadRequest("C0002");
                }

                if (userId != newCt.createdBy)
                {
                    return Common.ResponseMessage.BadRequest("C0018");
                }

                var contact = db.contacts.FirstOrDefault(c => c.id == id);
                if (contact == null)
                {
                    return Common.ResponseMessage.BadRequest("C0002");
                }

                var user = db.users.FirstOrDefault(c => c.id == userId);
                if (user == null)
                {
                    return Common.ResponseMessage.NotFound("C0018");
                }

                var userOwner = db.users.FirstOrDefault(c => c.id == contact.owner_id);
                if (userOwner == null)
                {
                    return Common.ResponseMessage.NotFound("C0018");
                }

                var existRq = db.requests.FirstOrDefault(r =>
                    r.old_contact_id == contact.id && r.new_contact_id == idDuplicate);

                if (existRq != null)
                {
                    existRq.status = "R0002";
                    SendGridConfig.SendRequestTransferContact(userOwner.email, contact, user, existRq);
                    db.SaveChanges();
                    return new ResponseMessageResult(new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "Success",
                            Data = new
                            {
                                id_request = existRq.id,
                                code_request = existRq.code
                            }
                        }), Encoding.UTF8, "application/json")
                    });
                }

                Random random = new Random();
                const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                var codeRq = new string(Enumerable.Repeat(chars, 30)
                    .Select(s => s[random.Next(s.Length)]).ToArray());


                rq = db.requests.Add(new request()
                {
                    requester = userId,
                    receiver = userOwner.id,
                    old_contact_id = contact.id,
                    new_contact_id = idDuplicate,
                    status = "R0002",
                    create_date = dateCreated,
                    code = codeRq
                });

                SendGridConfig.SendRequestTransferContact(userOwner.email, contact, user, rq);
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
                    Data = new
                    {
                        id_request = rq?.id,
                        code_request = rq?.code
                    }
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpGet]
        [Route("api/contacts/request/info/{id}/{code}")]
        public ResponseMessageResult RequestInfo(int id, string code)
        {
            request rq;
            var requester = new user();
            var receiver = new user();
            var contact = new contact();
            try
            {
                rq = db.requests.FirstOrDefault(c => c.id == id && c.code == code);
                if (rq == null)
                {
                    return Common.ResponseMessage.NotFound("C0019");
                }

                requester = db.users.FirstOrDefault(c => c.id == rq.requester);
                if (requester == null)
                {
                    return Common.ResponseMessage.NotFound("C0018");
                }

                receiver = db.users.FirstOrDefault(c => c.id == rq.receiver);
                if (receiver == null)
                {
                    return Common.ResponseMessage.NotFound("C0018");
                }

                contact = db.contacts.FirstOrDefault(c => c.id == rq.old_contact_id);
                if (contact == null)
                {
                    return Common.ResponseMessage.NotFound("C0002");
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
                    Data = new
                    {
                        requester = requester?.name,
                        receiver = receiver?.name,
                        contact = new
                        {
                            nameCt = contact?.name,
                            emailCt = contact?.email,
                            phoneCt = contact?.phone,
                            jobCt = contact?.job_title,
                            companyCt = contact?.company,
                            addressCt = contact?.address,
                        }
                    }
                }), Encoding.UTF8, "application/json")
            });
        }

        // PUT
        [HttpPut]
        [Route("api/contacts/{id}")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager })]
        public ResponseMessageResult PutUpdateContact(int id, ContactRequest request)
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

                var duplicate = db.contacts.FirstOrDefault(c => c.email == email && c.id != id);
                if (duplicate != null)
                {
                    return Common.ResponseMessage.NotFound("D0005");
                }

                contact.name = name;
                contact.job_title = jobTitle;
                contact.company = company;
                contact.phone = phone;
                contact.fax = fax;
                contact.email = email;
                contact.address = address;
                contact.website = website;
                contact.note = request.Note;

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

                    contact.reason_status = statusCt.ReasonStatus;
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
            int userId = ((JwtToken)Request.Properties["payload"]).Uid;
            try
            {
                var contact = db.contacts.FirstOrDefault(c => c.id == id && c.owner_id == userId);
                if (contact == null)
                {
                    return Common.ResponseMessage.NotFound("C0002");
                }

                if (string.IsNullOrEmpty(reasonDaContact.ReasonDa))
                {
                    return Common.ResponseMessage.BadRequest("C0004");
                }

                contact.isActive = false;
                contact.reason_deactive = reasonDaContact.ReasonDa;
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
                contact.reason_deactive = null;
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

        // PATCH
        [HttpPatch]
        [Route("api/contacts/request/{id}/{code}")]
        public ResponseMessageResult TransferContact(int id, string code)
        {
            try
            {
                var rq = db.requests.FirstOrDefault(c => c.id == id && c.code == code);
                if (rq == null)
                {
                    return Common.ResponseMessage.NotFound("C0019");
                }

                var contact = db.contacts.FirstOrDefault(c => c.id == rq.new_contact_id);
                if (contact == null)
                {
                    return Common.ResponseMessage.NotFound("C0018");
                }

                var oldCt = db.contacts.FirstOrDefault(c => c.id == rq.old_contact_id);
                if (oldCt == null)
                {
                    return Common.ResponseMessage.NotFound("C0018");
                }

                rq.old_contact_id = null;
                rq.new_contact_id = null;

                db.contacts.Remove(oldCt);

                contact.owner_id = rq.requester;
                rq.status = "R0003";

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
                    Message = "success",
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpPatch]
        [Route("api/contacts/request/cancel/{id}/{code}")]
        public ResponseMessageResult CancelTransferContact(int id, string code)
        {
            try
            {
                var rq = db.requests.FirstOrDefault(c => c.id == id && c.code == code);
                if (rq == null)
                {
                    return Common.ResponseMessage.NotFound("C0019");
                }

                rq.status = "R0001";

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
                    Message = "R0004",
                }), Encoding.UTF8, "application/json")
            });
        }
    }
}