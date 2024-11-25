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
    public class UserLoginQuery:IRequest<object>
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

            var userCheck = await _appDbContext.Set<User>().FirstOrDefaultAsync(u => u.UserEmail == user.UserEmail && u.Roles==user.Roles);
            if (userCheck == null || !BCrypt.Net.BCrypt.Verify(user.Password, userCheck.Password))
            {
                return new
                {
                    status = 401,
                    message = "Invalid email or password or Roles"
                };
            }

            var accessToken = await _jwtService.Authenticate(userCheck.Id, userCheck.UserEmail, userCheck.FirstName, userCheck.LastName, userCheck.Roles);
            await _appDbContext.SaveChangesAsync(cancellationToken);

            var response = new
            {
                status = 200,
                message = "User Login successfuly",
                token = accessToken,
                userData=userCheck.Id
            };
            return response;
        }
    }
}
