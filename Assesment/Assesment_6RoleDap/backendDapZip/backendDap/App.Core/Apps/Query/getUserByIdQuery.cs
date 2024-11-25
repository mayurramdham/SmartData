using App.Core.Interface;
using Dapper;
using Domain.Entity;
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
    public class getUserByIdQuery:IRequest<object>
    {
        public int Id { get; set; }
    }
    public class getUserByIdQueryHandler : IRequestHandler<getUserByIdQuery, object>
    {
        private readonly IConfiguration _configuration;
        public getUserByIdQueryHandler(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<object> Handle(getUserByIdQuery request, CancellationToken cancellationToken)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            using var connection = new SqlConnection(connectionString);

            const string sql = "SELECT * FROM [User] WHERE Id = @Id";

            // Execute the query
            var user = await connection.QueryFirstOrDefaultAsync<User>(sql, new { Id = request.Id });

            if (user == null)
            {
                return new
                {
                    message = "User not found",
                    status = 404,
                    data = (object)null
                };
            }

            var response = new
            {
                message = "Get User By Id",
                status = 200,
                data = user
            };
            return response;
        }
    }
}
