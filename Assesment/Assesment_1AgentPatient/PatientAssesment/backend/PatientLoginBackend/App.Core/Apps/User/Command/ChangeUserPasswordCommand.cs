using App.Core.Interface;
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
    public class ChangeUserPasswordCommand : IRequest<object>
    {
        public ChangePasswordDto ChangePasswordDto { get; set; }
    }


    public class ChangeUserPasswordCommandHandler : IRequestHandler<ChangeUserPasswordCommand, object>
    {
        private readonly IAppDbContext _appDbContext;

        public ChangeUserPasswordCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<object> Handle(ChangeUserPasswordCommand request, CancellationToken cancellationToken)
        {
            var ChangePasswordDto = request.ChangePasswordDto;

            var user = await _appDbContext.Set<Domain.Entity.User>().FirstOrDefaultAsync(user => user.Email == ChangePasswordDto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(ChangePasswordDto.OldPassword, user.Password))
            {
                return "Incorrect EmailAddress or Password!";
            }

            

            if(BCrypt.Net.BCrypt.Verify(ChangePasswordDto.NewPassword, user.Password))
                {
                return "Old Password and New Password is Same";
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(ChangePasswordDto.NewPassword, 13);

           
            await _appDbContext.SaveChangesAsync(cancellationToken);

            var response = new
            {
                status = 200,
                message = "Password Change Successfully",
                data = user

            };
            return response;
        }

    }
}
