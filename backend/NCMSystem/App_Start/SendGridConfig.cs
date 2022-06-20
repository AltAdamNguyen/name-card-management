using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace NCMSystem
{
    public static class SendGridConfig
    {
        private static async Task SendEmail(string email, string htmlContent, string subject)
        {
            // Config sendgrid - get api key
            var apiKey = WebConfigurationManager.AppSettings["sendgrid_api_key"];
            var client = new SendGridClient(apiKey);
            
            // setup Sender (Warning: Don't Change)
            var from = new EmailAddress("admin@nmtung.xyz", "Name Card Management | No Reply");
            
            var to = new EmailAddress(email);
            
            var msg = MailHelper.CreateSingleEmail(from, to, subject, null, htmlContent);
            
            // action send email
            var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
        }

        public static async void SendCodeResetPassword(string email, string code)
        {
            string subject = "Reset Password";
            string content = "Code for reset password: " + code;

            await SendEmail(email, content, subject);
        }
    }
}