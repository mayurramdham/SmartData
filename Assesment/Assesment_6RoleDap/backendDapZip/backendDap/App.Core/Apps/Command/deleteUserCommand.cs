using App.Core.Interface;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.Command
{
    public class deleteUserCommand:IRequest<object>
    {
        public int Id { get; set; } 
    }
    public class deleteUserCommandHandler : IRequestHandler<deleteUserCommand, object>
    {
        private readonly IAppDbContext _appDbContext;
        public deleteUserCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<object> Handle(deleteUserCommand request, CancellationToken cancellationToken)
        {
            var id = request.Id;

            var user = await _appDbContext.Set<Domain.Entity.User>().FindAsync(id);

            if (user == null)
            {
                return false;
            }
            user.isDeleted= true;
            await _appDbContext.SaveChangesAsync(cancellationToken);
            var response = new
            {
                status = 200,
                message = "user deleted successfully",
                data = user
            };
            return response;

        }
    }
}
