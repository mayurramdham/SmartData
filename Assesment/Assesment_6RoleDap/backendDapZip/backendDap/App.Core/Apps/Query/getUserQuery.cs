using Dapper;
using Domain.Model;
using MediatR;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.Query
{
    public class getUserQuery:IRequest<object>

    {
    }
    public class GetUsersQueryHandler : IRequestHandler<getUserQuery, object>
    {
        private readonly IConfiguration _configuration;

        public GetUsersQueryHandler(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<object> Handle(getUserQuery request, CancellationToken cancellationToken)
        {
            // Retrieve the connection string from appsettings.json
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            // Use the connection string to connect to the database
            using var connection = new SqlConnection(connectionString);

            const string sql = "SELECT * FROM [User] WHERE isDeleted = 0" ;

            var users = await connection.QueryAsync<object>(sql);
            var reponse = new
            {
                message = "All User Information",
                status = 200,
                data = users.ToList()

        };
            return reponse;

           
        }
    }
}
