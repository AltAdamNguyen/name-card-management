using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Http;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using NCMSystem.Models.CallAPI.ScanNC;
using Tesseract;

namespace NCMSystem.Controllers
{
    public class ScanController : ApiController
    {
        [HttpPost]
        [Route("api/scan")]
        public ScanNCResponse Post([FromBody] ScanNCRequest image)
        {
            string[] imageArray = image.image.Split(',');
            byte[] bytes = Convert.FromBase64String(imageArray[1]);

            Image img;
            string fileName = AppDomain.CurrentDomain.BaseDirectory + "Images\\nameCard.jpg";

            using (MemoryStream ms = new MemoryStream(bytes))
            {
                img = Image.FromStream(ms);
                img.Save(fileName, System.Drawing.Imaging.ImageFormat.Jpeg);
            }

            ScanNCResponse scanResult = new ScanNCResponse();

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
                            ExtractText(text.Trim(), scanResult);
                            Console.Out.WriteLine("---------------------" + text);
                        }
                    }
                }
            }
            scanResult.imgUrl = UploadCloud(fileName);
            return scanResult;
        }

        public string UploadCloud(string path)
        {
            // get account from cloudinary
            Account a = new Account(
                "trungdang",
                "573991769983678",
                "p03uFAEsd3TTDLZ53clPxVHo9vA");

            Cloudinary cloudinary = new Cloudinary(a);
            cloudinary.Api.Secure = true;

            // Upload images to cloudinary
            string arrayString;
            var uploadResult = cloudinary.Upload(new ImageUploadParams()
            {
                File = new FileDescription(path),
            });
            arrayString = uploadResult.SecureUrl.ToString();

            File.Delete(path);

            return arrayString;
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

        public void ExtractText(string originText, ScanNCResponse scanResult)
        {
            
            string[] rsArray = Regex.Split(originText, @"\r\n|\r|\n");

            //remove empty string
            rsArray = rsArray.Where(s => !string.IsNullOrEmpty(s)).ToArray();

            TextInfo myTi = new CultureInfo("vi-VN", false).TextInfo;
            scanResult.items = new List<string>();

            for (int i = 0; i < rsArray.Length; i++)
            {
                if (!rsArray[i].Contains("."))
                {
                    rsArray[i] = myTi.ToTitleCase(rsArray[i].ToLower());

                    if (Regex.IsMatch(rsArray[i], @"\d"))
                    {
                        string str = rsArray[i].Replace(" ", "");
                        str = Regex.Replace(str, @"[(),-]", String.Empty);
                        if (Regex.IsMatch(rsArray[i], @"Fax"))
                        {
                            scanResult.fax = SplitNumber(str);
                        }
                        else if (Regex.IsMatch(rsArray[i], @"Tel|Office|Off|Telephone"))
                        {
                            scanResult.telephone = SplitNumber(str);
                        }
                        else if (Regex.IsMatch(rsArray[i], @"Mobile|Mob|Mobi"))
                        {
                            scanResult.mobile = SplitNumber(str);
                        }
                    }

                    try
                    {
                        scanResult.items.Add(rsArray[i]);
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                        throw;
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
                            scanResult.email = eStr;
                        }
                        else if (eStr.Contains("www"))
                        {
                            scanResult.website = eStr;
                        }
                    }
                }
            }
        }
    }
}