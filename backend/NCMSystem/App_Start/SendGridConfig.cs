using System;
using NCMSystem.Models;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace NCMSystem
{
    public static class SendGridConfig
    {
        private static void SendEmail(string email, string htmlContent, string subject)
        {
            // Config sendgrid - get api key
            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var client = new SendGridClient(apiKey);

            // setup Sender (Warning: Don't Change)
            var from = new EmailAddress("admin@nmtung.xyz", "Name Card Management | No Reply");

            var to = new EmailAddress(email);

            var msg = MailHelper.CreateSingleEmail(from, to, subject, null, htmlContent);

            // action send email
            var response = client.SendEmailAsync(msg).ConfigureAwait(false);
        }

        public static async void SendCodeResetPassword(string email, string code)
        {
            string subject = "Reset Password";
            string content = "Code for reset password: " + code;

            SendEmail(email, content, subject);
        }

        public static async void SendRequestTransferContact(string email,contact contact, user user,request rq)
        {
            string nameCt = contact.name ?? "";
            string emailCt = contact.email ?? "";
            string phoneCt = contact.phone ?? "";
            string jobCt = contact.job_title ?? "";
            string companyCt = contact.company ?? "";
            string addressCt = contact.address ?? "";
            string subject = "Request Transfer Contact";
            string content =
                $@"<!DOCTYPE html><html lang='en'> <head> <meta charset='UTF-8'/> <meta name='viewport' content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'/> <meta http-equiv='X-UA-Compatible' content='ie=edge'/> <title>Document</title> <link rel='preconnect' href='https://fonts.googleapis.com'/> <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin/> <link href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap' rel='stylesheet'/> <style>body{{font-family: 'Roboto', sans-serif;}}.main_contain{{margin: 0 auto; background-color: #e7e7e7; width: 500px; padding: 10px 30px;}}.image{{text-align: center; margin: 20px 0;}}.main{{background-color: white; padding: 14px; border-radius: 14px;}}h1{{font-size: 18px; margin: 10px 0 20px; text-align: center; font-weight: 700;}}h3{{font-size: 16px; margin: 10px 0; font-weight: 300;}}.requester_information{{font-size: 14px; padding-bottom: 14px; padding-top: 30px;}}.requester_information tr > td:first-child{{font-weight: bold; padding-right: 20px;}}.ncm{{border: 1px solid; width: 336px; height: 172px; border-radius: 12px; padding: 20px; margin: 20px auto 0;}}.name{{font-size: 18px; font-weight: bold;}}.company{{font-size: 12px; margin-top: 10px;}}.job{{font-size: 13px;}}.information{{margin-top: 40px; row-gap: 4px;}}.information > div{{align-items: center; column-gap: 10px; font-size: 14px;}}.email img, .phone img, .address img{{margin-right: 10px; font-size: 14px;}}.copyright{{padding: 10px 0 20px; font-size: 12px; text-align: center;}}.buttonNCM{{display: inline-block; width: 100px; outline: none; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-top: 20px; text-decoration: none;}}.accept{{background-color: #265de8; color: white !important; margin-right: 10px;}}.deny{{background-color: #afafaf; color: white !important;}}</style> </head> <body> <div class='main_contain'> <div class='image'> <img width='100' src='https://ncmsystem.azurewebsites.net/Images/NCM.png' alt=''/> </div><div class='main'> <h1>You have a request to transfer owner contact!</h1> <hr/> <div class='ncm'> <div> <div class='name'>{nameCt}</div><div class='company'>{companyCt}</div><div class='job'>{jobCt}</div></div><div class='information'> <div class='email'> <img src='https://img.icons8.com/ios-glyphs/14/000000/new-post.png'/>{emailCt}</div><div class='phone'> <img src='https://img.icons8.com/ios-glyphs/14/000000/phone--v1.png'/>{phoneCt}</div><div class='address'> <img src='https://img.icons8.com/ios-glyphs/14/000000/order-delivered.png'/>{addressCt}</div></div></div><div class='requester_information'> <h3>Requester Information</h3> <table> <tr> <td>Name:</td><td>{user.name}</td></tr><tr> <td>Email:</td><td>{user.email}</td></tr></table> </div><hr/> <div> <div> <strong>Do you accept to transfer owner for this contact?</strong> </div><div style='color: #e70505; font-size: 12px'> <i >(If you accept, you will be transferred to the new owner. Cannot undo.)</i > </div><div style='text-align: center'> <div> <a href='https://ncm.nmtung.dev/{rq.id}/{rq.code}' class='buttonNCM accept'>Confirm</a></div></div></div></div><div class='copyright'> NCMSystem ©2022-2027<br/>Hoa Lac High-tech, FPT University, Thach Hoa, Thach That, Ha Noi </div></div></body></html>";

            SendEmail(email, content, subject);
        }
    }
}