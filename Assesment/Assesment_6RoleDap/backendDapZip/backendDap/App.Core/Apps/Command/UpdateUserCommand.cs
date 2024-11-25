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

namespace App.Core.Apps.Command
{
    public class UpdateUserCommand:IRequest<object>
    {
        public updateUserDto updateDto  { get; set; } 
        //public int Id   { get; set; }
    }
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, object>
    {
        private readonly IAppDbContext _appDbContext;
        public UpdateUserCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<object> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var Id= request.updateDto.Id;
            var user = await _appDbContext.Set<Domain.Entity.User>().FindAsync(Id);
            if (user == null)
            {
                return "User not found" ;
            }
            user.FirstName = request.updateDto.FirstName;
            user.LastName = request.updateDto.LastName;
            user.UserEmail = request.updateDto.UserEmail;
            user.Roles = request.updateDto.Roles;
            user.Address = request.updateDto.Address;

            await _appDbContext.SaveChangesAsync(cancellationToken);
            var response = new
            {
                status = 200,
                message = "User updated successfuuly",
                data = user
            };
            return response;
        }
    }
}
