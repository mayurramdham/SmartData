using App.core.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.core.App.Product.Query
{
    public class getAllProductQuery:IRequest<object>
    {
    }
    public class getAllProductQueryHandler : IRequestHandler<getAllProductQuery,object>
    {
        private readonly IAppDbContext _appDbContext;
        public getAllProductQueryHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<object> Handle(getAllProductQuery request, CancellationToken cancellationToken)
        {
            var productList=await _appDbContext.Set<Domain.Entity.Products.Product>().ToListAsync(cancellationToken);
            var response = new
            {
                status = 200,
                message = "Product List",
                product = productList
            };
            return response;
        }
    }
}
