using App.Core.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.State.Query
{
    public class GetAllState : IRequest<object>
    {
    }


    public class GetAllStateQueryHandler : IRequestHandler<GetAllState, object>
    {
        private readonly IAppDbContext _appDbContext;

        public GetAllStateQueryHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<object> Handle(GetAllState request, CancellationToken cancellationToken)
        {
            var allState = await _appDbContext.Set<Domain.State>().AsNoTracking().ToListAsync(cancellationToken);


            var response = new
            {
                message = "All states data",
                status = 200,
                data = allState

            };
            return response;
        }
    }






}
