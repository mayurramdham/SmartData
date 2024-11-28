using App.core.Interface;
using App.core.Model.Register;
using Domain.Entity.Register;
using Mapster;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.core.App.User.Command
{
    public class RegisterUserCommand:IRequest<object>
    {
        public UserDto UserDto { get; set; }
    }


    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, object>
    {
        private readonly IAppDbContext _appDbContext;
        public RegisterUserCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext=appDbContext;
        }
        public async  Task<object> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            var user = request.UserDto;
            user.UserName = GenerateUsername(user.FirstName, user.LastName, user.DOB);
            string plainPassword = GenerateRandomPassword();
            var newUser = user.Adapt<Domain.Entity.Register.User>();
            await _appDbContext.Set<Domain.Entity.Register.User>().AddAsync(newUser);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            

            string GenerateRandomPassword()
            {
                return Guid.NewGuid().ToString("N").Substring(0, 8);
            }
            string GenerateUsername(string firstName, string lastName, DateTime dob)
            {
                return $"EC_{lastName.ToUpper()}{firstName.ToUpper()[0]}{dob:ddMMyy}";
            }

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
