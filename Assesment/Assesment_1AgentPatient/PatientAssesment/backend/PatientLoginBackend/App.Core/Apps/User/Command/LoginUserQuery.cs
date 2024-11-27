using App.Core.Interface;
using Domain.ModelDto;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Core.Apps.User.Command
{
    public class LoginUserQuery : IRequest<object>
    {
        public LoginDto Login { get; set; }
    }

    public class ValidateUserQueryHandler : IRequestHandler<LoginUserQuery, object>
    {

        private readonly IAppDbContext _appDbContext;

        public ValidateUserQueryHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<object> Handle(LoginUserQuery request, CancellationToken cancellationToken)
        {
            var userDto = request.Login;

            var user = await _appDbContext.Set<Domain.Entity.User>().FirstOrDefaultAsync(user => user.Email == userDto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(userDto.Password, user.Password))
            {
                return "Invalid Credentials";
            }

            var response = new
            {
                status = 200,
                message = "User Login Successfully",
                data = user

            };
            return response;
        }

    }
}
