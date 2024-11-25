using App.Core.Interface;
using Domain.Entity;
using Domain.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.Query
{
    public class UserLoginQuery : IRequest<object>
    {
        public LoginDto Login { get; set; }
    }

    public class UserLoginQueryHandler : IRequestHandler<UserLoginQuery, object>
    {

        private readonly IAppDbContext _appDbContext;
        private readonly IJwtService _jwtService;
        private readonly IEmailService _emailService;

        public UserLoginQueryHandler(IAppDbContext appDbContext, IJwtService jwtService, IEmailService emailService)
        {
            _appDbContext = appDbContext;
            _jwtService = jwtService;
            _emailService = emailService;
        }

        public async Task<object> Handle(UserLoginQuery request, CancellationToken cancellationToken)
        {
            var agentDto = request.Login;

            var agent = await _appDbContext.Set<Domain.Entity.User>().FirstOrDefaultAsync(agent => agent.Email == agentDto.Email);

            if (agent == null || !BCrypt.Net.BCrypt.Verify(agentDto.Password, agent.Password))
            {
                return new
                {
                    status = 401,
                    message = "Invalid email or password"
                };
            }

            //generate the otp

            // Step 2: Generate OTP and send via email
            GenerateOtp generateOtp = new GenerateOtp();
            var otp = generateOtp.GenerateOtps(); // Assuming this generates the OTP

            var emailText = $"Your OTP is: {otp}";
            var isSent = await _emailService.SendEmailAsync(request.Login.Email, "User", "OTP Verification", emailText);

            if (!isSent)
            {
                return new
                {
                    status = 500,
                    message = "Failed to send OTP email"
                };
            }

            // Step 3: Store OTP in the database with a validity period
            DateTime now = DateTime.UtcNow;
            DateTime otpValidity = now.AddMinutes(5);

            var otpTable = new Otp
            {
                EmailOtp = otp,
                OtpValidity = otpValidity,
                UserName = request.Login.Email
            };

            await _appDbContext.Set<Domain.Entity.Otp>().AddAsync(otpTable, cancellationToken);
            await _appDbContext.SaveChangesAsync(cancellationToken);

            

            // Step 5: Return response
            var response = new
            {
                status = 200,
                message = "User login successful. OTP sent to your email.",
                data = new
                {
                    user = agent,
                    otp = otpTable // Include OTP data for debugging or testing purposes
                }
            };

            return response;

            //    var accessToken = await _jwtService.Authenticate(agent.UserId, agent.Email);

            //    var response = new
            //    {
            //        status = 200,
            //        message = "User Login Successfuuly",
            //        data = agent,
            //        token = accessToken
            //    };
            //    return response;
            //}

        }
    }
}
