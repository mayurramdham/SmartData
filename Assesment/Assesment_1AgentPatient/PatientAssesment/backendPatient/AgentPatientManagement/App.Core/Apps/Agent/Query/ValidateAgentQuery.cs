using App.Core.Interface;
using Domain.ModelDto;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Core.Apps.Agent.Query
{
    public class ValidateAgentQuery : IRequest<object>
    {
        public LoginDto Login { get; set; }
    }

    public class ValidateAgentQueryHandler : IRequestHandler<ValidateAgentQuery, object>
    {

        private readonly IAppDbContext _appDbContext;
        private readonly IJwtService _jwtService;

        public ValidateAgentQueryHandler(IAppDbContext appDbContext, IJwtService jwtService)
        {
            _appDbContext = appDbContext;
            _jwtService = jwtService;
        }

        public async Task<object> Handle(ValidateAgentQuery request, CancellationToken cancellationToken)
        {
            var agentDto = request.Login;

            var agent = await _appDbContext.Set<Domain.Agent>().FirstOrDefaultAsync(agent => agent.Email == agentDto.Email);

            if (agent == null || !BCrypt.Net.BCrypt.Verify(agentDto.Password, agent.Password))
            {
                return false;
            }
            var accessToken = await _jwtService.Authenticate(agent.AId, agent.Email);

            var response = new
            {
                status = 200,
                message = "User Login Successfuuly",
                data = agent,
                token= accessToken
            };
            return response;
        }

    }
}
