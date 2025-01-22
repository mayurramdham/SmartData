using App.Core.Interface;
using Domain.Model;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.Movie.Command
{
    public class DeleteMovieCommand:IRequest<ResponseDto>
    {
        public int MovieId { get; set; }
    }
    public class DeleteMovieCommandHandler : IRequestHandler<DeleteMovieCommand, ResponseDto>
    {
        private readonly IAppDbContext _appDbContext;
        public DeleteMovieCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<ResponseDto> Handle(DeleteMovieCommand request, CancellationToken cancellationToken)
        {
             var deleteMovieData = await _appDbContext.Set<Domain.Entity.Movie>().FindAsync(request.MovieId);
             deleteMovieData.isDeleted= true;
             await _appDbContext.SaveChangesAsync(cancellationToken);
             return new ResponseDto
            {
                Status = 200,
                Message = "Movie Deleted Successfully"
            };


        }
    }
}
