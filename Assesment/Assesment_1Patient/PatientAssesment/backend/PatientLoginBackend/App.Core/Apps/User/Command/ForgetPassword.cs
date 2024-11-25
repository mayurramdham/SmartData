using App.Core.Interface;
using Domain.Model;
using Domain.ModelDto;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.User.Command
{
    public class ForgetPassword:IRequest<object>
    {
        public ResetPasswordDto resetPasswordDTO;

    }
    public class ForgetPasswordHandler : IRequestHandler<ForgetPassword, object>
    {
        private readonly IAppDbContext _appDbContext;

        public ForgetPasswordHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<object> Handle(ForgetPassword request, CancellationToken cancellationToken)
        {
            
            var resetPasswordDto = request.resetPasswordDTO;

          
            var user = await _appDbContext.Set<Domain.Entity.User>()
                                          .FirstOrDefaultAsync(u => u.Email == resetPasswordDto.Email);

            
            if (user == null)
            {
                return new
                {
                    status = 400,
                    message = "Email does not exist!"
                };
            }

            
            user.Password = BCrypt.Net.BCrypt.HashPassword(resetPasswordDto.ResetPassword, 13);

            
            await _appDbContext.SaveChangesAsync(cancellationToken);

           
            return new
            {
                status = 200,
                message = "Password reset successfully."
            };
        }
    }
}
