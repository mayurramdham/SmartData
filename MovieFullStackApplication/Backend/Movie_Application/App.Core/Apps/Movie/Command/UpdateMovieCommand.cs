using App.Core.Interface;
using AutoMapper;
using Domain.Model;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.Movie.Command
{
    public class UpdateMovieCommand:IRequest<ResponseDto>
    {
        public UpdateMovieDto movieDto { get; set; }
    }
    public class UpdateMovieCommandHandler:IRequestHandler<UpdateMovieCommand,ResponseDto>
    {
        private readonly IAppDbContext _appDbContext;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;
        public UpdateMovieCommandHandler(IAppDbContext appDbContext,IMapper mapper, IImageService imageService)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
            _imageService = imageService;
        }

        public async Task<ResponseDto> Handle(UpdateMovieCommand request, CancellationToken cancellationToken)
        {
            var updateMovieDto = request.movieDto;

            // Check if the movie exists
            var movieEntity = await _appDbContext.Set<Domain.Entity.Movie>().FindAsync(updateMovieDto.MovieId);
            if (movieEntity == null)
            {
                return new ResponseDto
                {
                    Status = 404,
                    Message = "Movie not found"
                };
            }

            // Upload the poster image and get the URL
            var moviePoster = await _imageService.Upload(updateMovieDto.PosterImage);
            if (moviePoster is ResponseDto uploadResponse && uploadResponse.Status != 200)
            {
                return uploadResponse;
            }

            string uploadedMoviePosterUrl = moviePoster.Data.ToString();
            movieEntity.PosterImage = uploadedMoviePosterUrl; 
            movieEntity.MovieTitle = updateMovieDto.MovieTitle;
            movieEntity.ReleaseYear = updateMovieDto.ReleaseYear;

            await _appDbContext.SaveChangesAsync(cancellationToken);

            return new ResponseDto
            {
                Status = 200,
                Message = "Movie updated successfully",
                Data = movieEntity
            };

        }
    }
}
