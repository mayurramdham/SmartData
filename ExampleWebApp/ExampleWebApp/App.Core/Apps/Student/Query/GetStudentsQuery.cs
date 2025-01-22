using App.Core.Interfaces;
using App.Core.Models;
using Dapper;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.Apps.Student.Query
{
    public class GetStudentsQuery : IRequest<List<StudentDto>>
    {
    }

    public class GetStudentsQueryHandler : IRequestHandler<GetStudentsQuery, List<StudentDto>>
    {
        private readonly IAppDbContext _appDbContext;

        public GetStudentsQueryHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<List<StudentDto>> Handle(GetStudentsQuery request, CancellationToken cancellationToken)
        {
            return await GetAllStudents();

            //var test = await GetStudentByIdUsingSP(11);


            //var list = await _appDbContext.Set<Domain.Student>()
            //    .AsNoTracking()
            //    .ToListAsync();

            //return list.Adapt<List<StudentDto>>();
        }

        private async Task<List<StudentDto>> GetAllStudents()
        {
            using var connection = _appDbContext.GetConnection();

            var query = "SELECT * FROM Student;";

            var data = await connection.QueryAsync<StudentDto>(query);

            return data.AsList();
        }

        private async Task<StudentDto> GetStudentById(int id)
        {
            using var connection = _appDbContext.GetConnection();

            var query = "SELECT * FROM Student WHERE StudentId = @id;";

            var data = await connection.QueryFirstOrDefaultAsync<StudentDto>(query, new { id = id });

            return data;
        }

        private async Task<StudentDto> GetStudentByIdUsingSP(int id)
        {
            using var connection = _appDbContext.GetConnection();

            var query = "usp_GetStudentById";
            var dbParams = new
            {
                StudentId = id
            };

            var data = await connection.QueryFirstOrDefaultAsync<StudentDto>
            (
                query,
                dbParams,
                commandType: CommandType.StoredProcedure
            );

            return data;
        }

    }
}
