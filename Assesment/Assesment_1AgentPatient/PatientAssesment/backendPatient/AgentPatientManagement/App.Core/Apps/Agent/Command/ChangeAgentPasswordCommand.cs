using App.Core.Interface;
using Domain.ModelDto;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.Agent.Command
{
    public class ChangeAgentPasswordCommand : IRequest<object>
    {
        public ChangeAgentPasswordDto AgentPasswordDto { get; set; }
    }


    public class ChangeAgentPasswordCommandHandler : IRequestHandler<ChangeAgentPasswordCommand, object>
    {
        private readonly IAppDbContext _appDbContext;

        public ChangeAgentPasswordCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<object> Handle(ChangeAgentPasswordCommand request, CancellationToken cancellationToken)
        {
            var agentPasswordDto = request.AgentPasswordDto;

            var agent = await _appDbContext.Set<Domain.Agent>().FirstOrDefaultAsync(agent => agent.Email == agentPasswordDto.Email);

            if (agent == null || !BCrypt.Net.BCrypt.Verify(agentPasswordDto.OldPassword, agent.Password))
            {
                return false;
            }

            agent.Password = BCrypt.Net.BCrypt.HashPassword(agentPasswordDto.NewPassword, 13);

            await _appDbContext.SaveChangesAsync(cancellationToken);

            var response = new
            {
                status = 200,
                message = "Password Change Successfuly",
                data = agent
            };
            return response;
        }

    }
}
