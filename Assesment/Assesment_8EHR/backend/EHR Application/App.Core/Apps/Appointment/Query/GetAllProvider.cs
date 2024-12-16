using App.Core.Interface;
using Dapper;
using MediatR;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.Appointment.Query
{
    public class GetAllProvider:IRequest<object>
    {
        public int UserTypeId { get; set; }
    }
    public class GetAllProviderHandler : IRequestHandler<GetAllProvider, object>
    {
        private readonly IAppDbContext _appDbContext;
        private readonly IConfiguration _configuration;
        public GetAllProviderHandler(IAppDbContext appDbContext,IConfiguration configuration)
        {
            _appDbContext = appDbContext;
            _configuration = configuration;
        }

        public async Task<object> Handle(GetAllProvider request, CancellationToken cancellationToken)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            using var connection=new SqlConnection(connectionString);
            const string sql = "select * from [User] Where UserTypeId=@UserTypeId";
            //var user = await connection.QueryFirstOrDefaultAsync<Domain.Entity.Products.Product>(sql, new { PrId = request.PrId });
            var provider = await connection.QueryAsync<Domain.Entity.AuthProcess.User>(sql, new { UserTypeId = request.UserTypeId });
            if (sql == null)
            {
                return new
                {
                    message = "provider not found",
                    status = 404,
                    data = (object)null
                };
            }

            var response = new
            {
                message = "Get Provider By ProviderTypeId",
                status = 200,
                data = provider
            };
            return response;


        }
    }
}
