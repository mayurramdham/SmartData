using App.Core.Interface;
using BCrypt.Net;
using Domain.Entity;
using Domain.Model;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.Command
{
    public class CreateUserCommand : IRequest<object>
    {
        public UserDto User { get; set; }
    }


    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, object>
    {
        private readonly IAppDbContext _appDbContext;
         
        public CreateUserCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<object> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var agent = request.User;

            var agentData = await _appDbContext.Set<Domain.Entity.User>().FirstOrDefaultAsync(us => us.Email == agent.Email);

           // var existOtpData = await _appDbContext.Set<Domain.Entity.Otp>()
           //              .FirstOrDefaultAsync(o => o.UserName == agent.Email &&
           //                                        o.EmailOtp == agent.EmailOtp, cancellationToken);

           //if (existOtpData is null || (existOtpData.OtpValidity < DateTime.Now))
           // {
           //     return "Otp Expired";
           // }
             
             // await _appDbContext.Set<Domain.Entity.Otp>().Remove(existOtpData);
                                                   

            //if (existOtpData is null || (existOtpData.OtpValidity < DateTime.Now))
            //    throw new BadRequest("Otp Expired");

            if (agentData != null)
            {
                return false;
            }

            //var lastAgent = await _appDbContext.Set<Domain.Entity.User>().OrderByDescending(a => a.AgentId).FirstOrDefaultAsync();
            //string newAgentId;

            //if (lastAgent == null)
            //{
            //    newAgentId = "AG0001";
            //}
            //else
            //{
            //    int numericPart = int.Parse(lastAgent.AgentId.Substring(2));
            //    newAgentId = $"AG{(numericPart + 1).ToString("D4")}";
            //}

            agent.Password = BCrypt.Net.BCrypt.HashPassword(agent.Password, 13);

            //agent.DateCreated = DateTime.Now;

            //agent.AgentId = newAgentId;

            var newAgent = agent.Adapt<Domain.Entity.User>();

            await _appDbContext.Set<Domain.Entity.User>().AddAsync(newAgent);

            await _appDbContext.SaveChangesAsync(cancellationToken);

            var response = new
            {
                status = 200,
                message = "User Create successfully",
                data = newAgent
            };


            return response;
        }

    }
}
