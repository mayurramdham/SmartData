using App.Core.Interface;
using Domain.ModelDto;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.Arm;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.User.Query
{
    public class GetUserByEmailQuery : IRequest<UserDetailsDto>
    {
        public string Email { get; set; }
    }


    public class GetUserByEmailQueryHandler : IRequestHandler<GetUserByEmailQuery, UserDetailsDto>
    {

        private readonly IAppDbContext _appDbContext;

        public GetUserByEmailQueryHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<UserDetailsDto> Handle(GetUserByEmailQuery request, CancellationToken cancellationToken)
        {
            var email = request.Email;

            var user = await _appDbContext.Set<Domain.Entity.User>().FirstOrDefaultAsync(user => user.Email == email);

            var userData = user.Adapt<UserDetailsDto>();

            return userData;
        }

    }
}
