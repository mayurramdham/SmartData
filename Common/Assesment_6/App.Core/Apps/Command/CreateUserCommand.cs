using App.Core.Interface;
using BCrypt.Net;
using Domain.Model;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.Command
{
    public class CreateUserCommand: IRequest<object>
    {
        public UserDTO UserDTO { get; set; }
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
            var user = request.UserDTO;

            var existingUser = await _appDbContext.Set<Domain.Entity.User>().FirstOrDefaultAsync(u => u.UserEmail == user.UserEmail);
            if (existingUser != null)
            {
                return "User Already Exists";
            }
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password, 13);
            var newUser=user.Adapt<Domain.Entity.User>();   
            await _appDbContext.Set<Domain.Entity.User>().AddAsync(newUser);  //adding the user
            await _appDbContext.SaveChangesAsync(cancellationToken);  //saving the user

            var response = new
            {
                status = 200,
                message = "User Added Successfully",
                data = newUser
            };
            return response;
            



        }
    }
}
