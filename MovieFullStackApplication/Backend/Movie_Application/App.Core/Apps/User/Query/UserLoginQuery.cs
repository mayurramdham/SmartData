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

namespace App.Core.Apps.User.Query
{
    public class UserLoginQuery : IRequest<object>
    {
        public LoginDTO loginDTO;
    }
    public class UserLoginQueryHandler : IRequestHandler<UserLoginQuery, object>
    {
        private readonly IAppDbContext _appDbContext;
        private readonly IJwtService _jwtService;
        public UserLoginQueryHandler(IAppDbContext appDbContext, IJwtService jwtService)
        {
            _appDbContext = appDbContext;
            _jwtService = jwtService;
        }
        public async Task<object> Handle(UserLoginQuery request, CancellationToken cancellationToken)
        {
            var user = request.loginDTO;

            var userCheck = await _appDbContext.Set<Domain.Entity.User>().FirstOrDefaultAsync(u => u.UserEmail == user.UserEmail);
            
            if (userCheck == null || !BCrypt.Net.BCrypt.Verify(user.Password, userCheck.Password))
            {
                return new
                {
                    status = 401,
                    message = "Invalid email or password"
                };
            }
            var role = await _appDbContext.Set<Role>().FirstOrDefaultAsync(r => r.RoleId == userCheck.RoleId);
            var accessToken = await _jwtService.Authenticate(userCheck.Id, userCheck.UserEmail, userCheck.UserName, role.RoleName, userCheck.apiKey);
            await _appDbContext.SaveChangesAsync(cancellationToken);

            return new ResponseDto
            {
                Status = 200,
                Message = "User Login successfuly",
                Data = accessToken
            };

        }
    }
}
