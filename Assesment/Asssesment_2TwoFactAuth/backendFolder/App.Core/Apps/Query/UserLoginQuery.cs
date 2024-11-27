using App.Core.Interface;
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

        public UserLoginQueryHandler(IAppDbContext appDbContext, IJwtService jwtService)
        {
            _appDbContext = appDbContext;
            _jwtService = jwtService;
        }

        public async Task<object> Handle(UserLoginQuery request, CancellationToken cancellationToken)
        {
            var agentDto = request.Login;

            var agent = await _appDbContext.Set<Domain.Entity.User>().FirstOrDefaultAsync(agent => agent.Email == agentDto.Email);

            if (agent == null || !BCrypt.Net.BCrypt.Verify(agentDto.Password, agent.Password))
            {
                return false;
            }
            var accessToken = await _jwtService.Authenticate(agent.UserId, agent.Email);

            var response = new
            {
                status = 200,
                message = "User Login Successfuuly",
                data = agent,
                token = accessToken
            };
            return response;
        }

    }
}
