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
            var from = new EmailAddress("admin@nmtung.xyz", "SWP391 - OnlineShop");
            
            var to = new EmailAddress(email);
            
            var msg = MailHelper.CreateSingleEmail(from, to, subject, null, htmlContent);
            
            // action send email
            var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
        }

        public static void SendEmailActive(string email, string code)
        {
            string subject = "Active your account";
            string content = "Link for active your account here: <a href='https://localhost:44365/Auth/Active?code=" + code + "'>Here<a/>";

            SendEmail(email, content, subject);
        }
    }
}