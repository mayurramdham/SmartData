using Dapper;
using MediatR;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace App.Core.Apps.Query
{
    public class getUserQuery : IRequest<object>

    {
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
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
            var pageSize = request.PageSize;
            var pageNumber = request.PageNumber;
            // Retrieve the connection string from appsettings.json
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            // Use the connection string to connect to the database
            using var connection = new SqlConnection(connectionString);

            //const string sql = "SELECT * FROM [User] WHERE isDeleted = 0";

            //var users = await connection.QueryAsync<object>(sql);
            //var finalUsers = users.Skip((pageNumber - 1) * pageSize)
            //                         .Take(pageSize).ToList();

            const string sql = @"
              SELECT * FROM [User]
       WHERE isDeleted = 0
    ORDER BY [Id]
    OFFSET @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY";

            var skip = (pageNumber - 1) * pageSize;

            var parameters = new { Offset = skip, PageSize = pageSize };

            var finalUsers = (await connection.QueryAsync<object>(sql, parameters)).ToList();

            var reponse = new
            {
                message = "All User Information",
                status = 200,
                data = finalUsers

            };
            return reponse;


        }
    }
}
