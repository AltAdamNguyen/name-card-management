using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.Http;
using System.Web.Http.Results;
using NCMSystem.Models.CallAPI;
using NCMSystem.Models.CallAPI.ScanNC;
using Newtonsoft.Json;
using Tesseract;

namespace NCMSystem.Controllers
{
    public class ScanController : ApiController
    {
        [HttpPost]
        [Route("api/scan")]
        public ResponseMessageResult Post([FromBody] ScanNCRequest image)
        {
            try
            {
                string[] imageArray = image.image.Split(',');
                byte[] bytes = Convert.FromBase64String(imageArray[1]);

                Image img;
                long timeStart = DateTime.Now.Ticks;
                string fileName = AppDomain.CurrentDomain.BaseDirectory + "Images\\nameCard_" + timeStart + ".jpg";

                using (MemoryStream ms = new MemoryStream(bytes))
                {
                    img = Image.FromStream(ms);
                    img.Save(fileName, System.Drawing.Imaging.ImageFormat.Jpeg);
                }

                InfoNC info = new InfoNC
                {
                    imgUrl = $"https://{Request.RequestUri.Host}/Images/nameCard_{timeStart}.jpg"
                };

                ScanResponse response = new ScanResponse();

                using (var engine = new TesseractEngine(AppDomain.CurrentDomain.BaseDirectory + "tessdata", "vie",
                           EngineMode.Default))
                {
                    using (var imgScan = new Bitmap(fileName))
                    {
                        using (var pix = PixConverter.ToPix(imgScan))
                        {
                            using (var page = engine.Process(pix))
                            {
                                var text = page.GetText();
                                string[] rsArray = Regex.Split(text.Trim(), @"\r\n|\r|\n");
                                if (rsArray.Length == 0 || rsArray.Length < 3)
                                {
                                    return Common.ResponseMessage.Good("Scan fail");
                                }
                                response.data = ExtractText(rsArray, info);
                            }
                        }
                    }
                }

                return new ResponseMessageResult(new HttpResponseMessage()
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                    {
                        Message = "Success",
                        Data = response
                    }), Encoding.UTF8, "application/json")
                });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public static bool HasSpecialChar(string input)
        {
            if (Regex.IsMatch(input, @"|!#%&=»«@£§€;<>_"))
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public string SplitNumber(string str)
        {
            string[] rsArray2 = Regex.Split(str, @"\D+");
            //string contain number
            string result = "";
            foreach (string s in rsArray2)
            {
                if (s != "")
                {
                    result = s;
                }
            }

            return result;
        }

        public string IsEmpty(string str)
        {
            return (str.Trim() == "") ? null : str;
        }

        public InfoNC ExtractText(string[] rsArray, InfoNC info)
        {
            List<string> listI = new List<string>();

            //remove empty string
            rsArray = rsArray.Where(s => !string.IsNullOrEmpty(s)).ToArray();

            TextInfo myTi = new CultureInfo("vi-VN", false).TextInfo;

            for (int i = 0; i < rsArray.Length; i++)
            {
                bool has = false;
                if (!rsArray[i].Contains("."))
                {
                    rsArray[i] = myTi.ToTitleCase(rsArray[i].ToLower()).Trim();

                    if (Regex.IsMatch(rsArray[i], @"\d"))
                    {
                        string str = rsArray[i].Replace(" ", "");
                        str = Regex.Replace(str, @"[(),-]", String.Empty);
                        if (Regex.IsMatch(rsArray[i], @"Fax"))
                        {
                            string fax = SplitNumber(str);
                            info.fax = IsEmpty(fax);
                            has = true;
                        }
                        else if (Regex.IsMatch(rsArray[i], @"Tel|Office|Off|Telephone"))
                        {
                            string tele = SplitNumber(str);
                            info.telephone = IsEmpty(tele);
                            has = true;
                        }
                        else if (Regex.IsMatch(rsArray[i], @"Mobile|Mob|Mobi|Đt|Di Động|ĐTDĐ|Di động"))
                        {
                            string mobile = SplitNumber(str);
                            info.mobile = IsEmpty(mobile);
                            has = true;
                        }
                    }

                    //split number and character ':' from string 
                    if (has == false)
                    {
                        string[] separate = Regex.Split(rsArray[i], @":");
                        if (!HasSpecialChar(rsArray[i]))
                        {
                        }

                        if (separate.Length > 1)
                        {
                            listI.Add(SplitNumber(separate[1].Replace(" ", "").Trim()));
                        }
                        else
                        {
                            listI.Add(rsArray[i].Trim());
                        }
                    }
                }
                else if (rsArray[i].Contains("."))
                {
                    string[] strSplit = rsArray[i].Split(' ');

                    //extract email and website
                    foreach (string eStr in strSplit)
                    {
                        if (eStr.Contains("@"))
                        {
                            info.email = IsEmpty(eStr);
                        }
                        else if (eStr.Contains("www"))
                        {
                            info.website = IsEmpty(eStr);
                        }
                    }
                }
            }

            info.items = listI;
            return info;
        }
    }
}