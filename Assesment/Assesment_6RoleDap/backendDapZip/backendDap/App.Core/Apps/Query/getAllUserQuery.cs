using App.Core.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.Query
{
    public class getAllUserQuery:IRequest<object>
    {
    }
    public class getAllUserQueryHandler:IRequestHandler<getAllUserQuery,object> 
    {
        private readonly IAppDbContext _appDbContext;
        public getAllUserQueryHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<object> Handle(getAllUserQuery request, CancellationToken cancellationToken)
        {
   
            var allUser= await _appDbContext.Set<Domain.Entity.User>().ToListAsync(cancellationToken);
            var response = new
            {
                status = 200,
                message = "All user data",
                data = allUser
            };
            return response;
        }
    }
}
