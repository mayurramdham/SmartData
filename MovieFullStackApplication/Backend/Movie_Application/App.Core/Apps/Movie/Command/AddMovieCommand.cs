using App.Core.Interface;
using AutoMapper;
using Domain.Model;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.Apps.Movie.Command
{
    public class AddMovieCommand : IRequest<ResponseDto>
    {
        public MovieDto MovieDto { get; set; }
    }

    public class AddMovieCommandHandler : IRequestHandler<AddMovieCommand, ResponseDto>
    {
        private readonly IAppDbContext _appDbContext;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;

        public AddMovieCommandHandler(IAppDbContext appDbContext, IImageService imageService,IMapper mapper)
        {
            _appDbContext = appDbContext;
            _imageService = imageService;
            _mapper = mapper;
        }

        public async Task<ResponseDto> Handle(AddMovieCommand request, CancellationToken cancellationToken)
        {
            var movieData = request.MovieDto;
            var existingMovie = await _appDbContext.Set<Domain.Entity.Movie>()
                                .FirstOrDefaultAsync(m => m.MovieTitle == movieData.MovieTitle, cancellationToken);

            if (existingMovie != null)
            {
                return new ResponseDto
                {
                    Status = 400,
                    Message = "Movie Already Exists"
                };
            }

            var moviePoster = await _imageService.Upload(movieData.PosterImage);
            if (moviePoster is ResponseDto uploadResponse && uploadResponse.Status != 200)
            {
                return uploadResponse;
            }

            string uploadedMoviePosterUrl = moviePoster.Data.ToString();
            var moviesData = _mapper.Map<Domain.Entity.Movie>(movieData); // used automapper to map the data
            moviesData.PosterImage = uploadedMoviePosterUrl;
            await _appDbContext.Set<Domain.Entity.Movie>().AddAsync(moviesData,cancellationToken );
            await _appDbContext.SaveChangesAsync(cancellationToken);

            return new ResponseDto
            {
                Status = 200,
                Message = "Movie Added Successfully",
                Data = moviesData
            };
        }
    }
}
