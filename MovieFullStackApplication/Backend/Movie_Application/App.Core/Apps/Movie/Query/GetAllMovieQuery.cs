using App.Core.Interface;
using Domain.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace App.Core.Apps.Movie.Query
{
    public class GetAllMovieQuery : IRequest<ResponseDto>
    {
        public string s { get; set; } // Search string
        public string apiKey { get; set; }
    }
    public class GetAllMovieQueryHandler : IRequestHandler<GetAllMovieQuery, ResponseDto>
    {
        private readonly IAppDbContext _appDbContext;
        public GetAllMovieQueryHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<ResponseDto> Handle(GetAllMovieQuery request, CancellationToken cancellationToken)
        {
            var query = _appDbContext.Set<Domain.Entity.Movie>()
                                     .Where(m => m.isDeleted == false);

            var user = await _appDbContext.Set<Domain.Entity.User>()
                                .FirstOrDefaultAsync(u => u.apiKey == request.apiKey);
            if (user == null)
            {
                throw new UnauthorizedAccessException("Invalid API key");
            }

            if (!string.IsNullOrWhiteSpace(request.s))
            {
                query = query.Where(m => m.MovieTitle != null &&
                                         EF.Functions.Like(m.MovieTitle, $"%{request.s}%"));
            }

            var allMovieData = await query.ToListAsync(cancellationToken);

            return new ResponseDto
            {
                Status = 200,
                Message = "Filtered Movie Data",
                Data = allMovieData
            };
        }

    }
}