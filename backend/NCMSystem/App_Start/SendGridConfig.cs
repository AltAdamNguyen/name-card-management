using System;
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

        public static async void SendRequestTransferContact(string email, object contact)
        {
            string subject = "Request Transfer Contact";
            string content =
                @"<!DOCTYPE html><html lang='en'> <head> <meta charset='UTF-8'/> <meta name='viewport' content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'/> <meta http-equiv='X-UA-Compatible' content='ie=edge'/> <title>Document</title> <link rel='preconnect' href='https://fonts.googleapis.com'/> <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin/> <link href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap' rel='stylesheet'/> <style>body{font-family: 'Roboto', sans-serif; color: #000000 !important;}.main_contain{margin: 0 auto; background-color: #e7e7e7; width: 500px; padding: 10px 30px;}.image{text-align: center; margin: 20px 0;}.main{background-color: white; padding: 14px; border-radius: 14px;}h1{font-size: 18px; margin: 10px 0 20px; text-align: center; font-weight: 700;}h3{font-size: 16px; margin: 10px 0; font-weight: 300;}.requester_information{font-size: 14px; padding-bottom: 14px; padding-top: 30px;}.requester_information tr > td:first-child{font-weight: bold; padding-right: 20px;}.vcard{border: 1px solid; width: calc(89px * 4 - 20px); height: calc(48px * 4 - 20px); border-radius: 12px; padding: 20px; margin: 20px auto 0;}.name{font-size: 18px; font-weight: bold;}.company{font-size: 12px; margin-top: 10px;}.job{font-size: 13px;}.information{margin-top: 40px; row-gap: 4px;}.information > div{align-items: center; column-gap: 10px; font-size: 14px;}.email img, .phone img, .address img{margin-right: 10px; font-size: 14px;}.copyright{padding: 10px 0 20px; font-size: 12px; text-align: center;}button{width: 100px; outline: none; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-top: 20px;}button.accept{background-color: #265de8; color: white; margin-right: 20px;}button.deny{background-color: #afafaf; color: white;}</style> </head> <body> <div class='main_contain'> <div class='image'> <img width='100' src='https://ncmsystem.azurewebsites.net/Images/NCM.png' alt=''/> </div><div class='main'> <h1>You have a request to transfer owner contact!</h1> <hr/> <div class='vcard'> <div> <div class='name'>Nguyen Manh Tung</div><div class='company'>FPT Software</div><div class='job'>Front-end Developer</div></div><div class='information'> <div class='email'> <img src='https://img.icons8.com/ios-glyphs/14/000000/new-post.png'/> nmtung.study@gmail.com </div><div class='phone'> <img src='https://img.icons8.com/ios-glyphs/14/000000/phone--v1.png'/> 0853576259 </div><div class='address'> <img src='https://img.icons8.com/ios-glyphs/14/000000/order-delivered.png'/> FPT University, Thach Hoa, Thach That, Ha Noi </div></div></div><div class='requester_information'> <h3>Requester Information</h3> <table> <tr> <td>Name:</td><td>Nguyen Manh Tung</td></tr><tr> <td>Email:</td><td>nmtungofficial@gmail.com</td></tr></table> </div><hr/> <div> <div> <strong>Do you accept to transfer owner for this contact?</strong> </div><div style='color: #e70505; font-size: 12px'> <i >(If you accept, you will be transferred to the new owner. Cannot undo.)</i > </div><div style='text-align: center'> <button class='accept'>Accept</button> <button class='deny'>Deny</button> </div></div></div><div class='copyright'> NCMSystem ©2022-2027<br/>Hoa Lac High-tech, FPT University, Thach Hoa, Thach That, Ha Noi </div></div></body></html>";

            SendEmail(email, content, subject);
        }
    }
}