using App.Core.Interface;
using Domain.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.User.Command
{
    public class RegisterUserCommand : IRequest<object>
    {
        public RegisterDTO User { get; set; }
    }

    public class CreateUserCommandHandler : IRequestHandler<RegisterUserCommand, object>
    {
        private readonly IAppDbContext _appDbContext;

        public CreateUserCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<object> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            var user = request.User;

            // Check if the user already exists
            var existingUser = await _appDbContext.Set<Domain.Entity.User>()
                                                  .FirstOrDefaultAsync(us => us.Email == user.Email);

            if (existingUser != null)
            {
                return new
                {
                    status = 400,
                    message = "User Already Exists"
                };
            }

            // Generate a new UserId
            var lastUser = await _appDbContext.Set<Domain.Entity.User>()
                                              .OrderByDescending(u => u.UserId)
                                              .FirstOrDefaultAsync();

            string newUserId;

            if (lastUser == null)
            {
                // Initialize if the table is empty
                newUserId = "PE001";
            }
            else
            {
                // Extract numeric part from last UserId
                int numericPart = int.Parse(lastUser.UserId.Substring(2));
                // Increment and format with leading zeros
                newUserId = $"PE{(numericPart + 1).ToString("D3")}";
            }

            // Set the generated UserId
            //newUserId = user.UserId; 

            // Hash the user's password
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password, 13);


            var model = new Domain.Entity.User
            {
                UserId=newUserId,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Password=user.Password,
            };

            // Add the user to the database
            await _appDbContext.Set<Domain.Entity.User>().AddAsync(model, cancellationToken);

            // Save changes to the database
            await _appDbContext.SaveChangesAsync(cancellationToken);

            var response = new
            {
                status = 200,
                message = "User Added Successfully",
                data = user
            };

            return response;
        }
    }


}
