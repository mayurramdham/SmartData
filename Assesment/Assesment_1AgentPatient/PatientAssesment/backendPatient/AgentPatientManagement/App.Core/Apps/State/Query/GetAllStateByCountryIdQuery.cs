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
    public class GetAllStateByCountryIdQuery : IRequest<object>
    {
        public int CountryId { get; set; }
    }


    public class GetAllStateByCountryIdQueryHandler : IRequestHandler<GetAllStateByCountryIdQuery, object>
    {
        private readonly IAppDbContext _appDbContext;

        public GetAllStateByCountryIdQueryHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<object> Handle(GetAllStateByCountryIdQuery request, CancellationToken cancellationToken)
        {
            var allStateByCountryId = await _appDbContext.Set<Domain.State>().Where(state => state.CountryId == request.CountryId).ToListAsync();

            var response = new
            {
                message = "All states data",
                status = 200,
                data = allStateByCountryId

            };
            return response;
        }
    }




}
