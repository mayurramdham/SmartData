using App.Core.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.Country.Query
{
    public class GetAllCountryQuery : IRequest<object>
    {
    }

    public class GetAllCountryQueryHandler : IRequestHandler<GetAllCountryQuery, object>
    {
        private readonly IAppDbContext _appDbContext;

        public GetAllCountryQueryHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<object> Handle(GetAllCountryQuery request, CancellationToken cancellationToken)
        {
            var allCountry = await _appDbContext.Set<Domain.Country>().AsNoTracking().ToListAsync();

            var response = new
            {
                status = 200,
                message = "All Country Data",
                data = allCountry

            };
            return response;

        }
    }


}
