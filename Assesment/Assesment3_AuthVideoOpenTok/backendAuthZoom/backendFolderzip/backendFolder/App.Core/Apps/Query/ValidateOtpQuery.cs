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
    public class ValidateOtpQuery : IRequest<object>
    {
        public ValidateDto EmailOtp;
    }
    public class ValidateOtpQueryHandler : IRequestHandler<ValidateOtpQuery, object>
    {
        private readonly IAppDbContext _appDbContext;
        private readonly IJwtService _jwtService;
        public ValidateOtpQueryHandler(IAppDbContext appDbContext, IJwtService jwtService) 
        {
            _appDbContext = appDbContext;
            _jwtService = jwtService;

        }

        public async Task<object> Handle(ValidateOtpQuery request, CancellationToken cancellationToken)
        {
            var otpRecord = await _appDbContext.Set<Domain.Entity.Otp>()
                           .FirstOrDefaultAsync(u=> u.UserName==request.EmailOtp.UserName && u.EmailOtp == request.EmailOtp.EmailOtp);


            Console.WriteLine($"Received OTP: {request.EmailOtp}");


            if (otpRecord is null)
            {
                return new
                {
                    status = 400,
                    message = "Invalid otp or invalid User"
                };
            }

            // var user = await _appDbContext.Set<User>().FirstOrDefaultAsync(u => u.Email == otpRecord.UserName, cancellationToken);
            var user = await _appDbContext.Set<User>().FirstOrDefaultAsync();
            if (user == null)
            {
                return new
                {
                    status = 404,
                    message = "User not found."
                };
            }

            // Step 4: Generate a JWT token
            var accessToken = await _jwtService.Authenticate(user.UserId, user.Email);



            if (otpRecord is null)
            {
                return new
                {
                    status = 400,
                    message = "Invalid otp or invalid User"
                };
            }

            if (DateTime.UtcNow > otpRecord.OtpValidity)
            {
                return new
                {
                    status = 400,
                    message = "OTP has expired."
                };
            }

            _appDbContext.Set<Domain.Entity.Otp>().Remove(otpRecord);
            await _appDbContext.SaveChangesAsync(cancellationToken);

            var response = new
            {
                status = 200,
                message = "Otp verified successfuly",
                token=accessToken
            };
            return response;
        }

    }
}