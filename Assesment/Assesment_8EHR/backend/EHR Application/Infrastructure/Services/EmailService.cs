using App.Core.Interface;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<bool> SendEmailAsync(string toE, string name, string subject, string message)
        {
            var apiKey = _configuration["SENDGRID_API_KEY:Key"];
            //Console.WriteLine(apiKey);

            var client = new SendGridClient(apiKey); // for sendgrid used package
            
            var from = new EmailAddress("chetanmundlesd@gmail.com", "Mayur Ramdham");
            var to = new EmailAddress(toE, name);
            var plaintext = message;
            var htmlcontent = "";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plaintext, htmlcontent);
            var response = await client.SendEmailAsync(msg);


            
            
            
            
            
            
            return true;
        }
    }
}
