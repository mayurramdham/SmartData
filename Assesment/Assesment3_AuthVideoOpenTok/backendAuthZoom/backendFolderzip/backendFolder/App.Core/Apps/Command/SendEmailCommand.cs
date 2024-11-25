using App.Core.Interface;
using Domain.Entity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.Command
{
    public class SendEmailCommand : IRequest<object>
    {
        public string UserName { get; set; }
    }

    public class SendEmailCommandHandler : IRequestHandler<SendEmailCommand, object>
    {
        private readonly IAppDbContext _appDbContext;
        private readonly IEmailService _emailService;

        public SendEmailCommandHandler(IAppDbContext appDbContext, IEmailService emailService)
        {
            _appDbContext = appDbContext;
            _emailService = emailService;
        }

        public async Task<object> Handle(SendEmailCommand request, CancellationToken cancellationToken)
        {
            GenerateOtp genereateOtp = new GenerateOtp();
            var otp = genereateOtp.GenerateOtps();

            var text = $"Your otp - {otp}";

            var isSend = await _emailService.SendEmailAsync(request.UserName, "User ", "Otp", text);

           
            DateTime now = DateTime.Now;
            DateTime twoMinutesLater = now.AddHours(1);

            var otpTable = new Otp
            {
                EmailOtp = otp,
                OtpValidity = twoMinutesLater,
                UserName = request.UserName,
            };

            await _appDbContext.Set<Domain.Entity.Otp>().AddAsync(otpTable, cancellationToken);

            await _appDbContext.SaveChangesAsync(cancellationToken);

            var response = new
            {
                status = 200,
                Message = "Otp Send Successfully to your Email",
                data=otpTable
            };
            return response;

           
        }
    }
}
