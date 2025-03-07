﻿using App.core.Interface;
using App.core.Model.Register;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.core.App.User.Command
{
    public class LoginOtpCommand:IRequest<object>
    {
        public OtpDto otpDto { get; set; }
    }
    public class LoginOtpCommandHandler : IRequestHandler<LoginOtpCommand, object>
    {
        private readonly IAppDbContext _appDbContext;
        private readonly IJwtService _jwtService;
        public LoginOtpCommandHandler(IAppDbContext appDbContext, IJwtService jwtService)
        {
            _appDbContext = appDbContext;
            _jwtService = jwtService;
        }

        public async Task<object> Handle(LoginOtpCommand request, CancellationToken cancellationToken)
        {
            var otpData = request.otpDto;
            var otp = await _appDbContext.Set<Domain.Entity.Register.Otp>()
                      .FirstOrDefaultAsync(o => o.UserName == otpData.UserName && o.OtpCode == otpData.OtpCode);

            if (otp == null)
            {
                return new
                {
                    status = 404,
                    message = "Invalid OTP or email"
                };
            }

            // if the OTP has expired
            if (otp.Expiration < DateTime.UtcNow)
            {
                return new
                {
                    status = 400,
                    message = "OTP has expired"
                };
            }
            var user = await _appDbContext.Set<Domain.Entity.Register.User>().FirstOrDefaultAsync(u=>u.UserName==otpData.UserName);
            
            if (user == null)
            {
                return new
                {
                    status = 404,
                    message = "User not found."
                };
            }
            var role= await _appDbContext.Set<Domain.Entity.Register.UserType>().FirstOrDefaultAsync(r => r.UserTypeId == user.UserTypeId);
            if(role is null)
            {
                return "role not found";
            }

            var accessToken = await _jwtService.Authenticate(user.UserId, user.Email, user.FirstName, user.LastName, role.UserTypeName);
            //remove otpdata from the table after verifing the otp
            // _appDbContext.Set<Domain.Entity.Register.Otp>().Remove(otp);
            var response = new
            {
                status = 200,
                message = "Otp verified successfuly",
                token = accessToken
            };
            return response;
        }
    }
}
