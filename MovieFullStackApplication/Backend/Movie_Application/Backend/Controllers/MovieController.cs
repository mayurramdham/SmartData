using App.Core.Apps.Movie.Command;
using App.Core.Apps.Movie.Query;
using Domain.Model;
using Domain.Model.ValidationDTO;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMediator _mediator;
        public MovieController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("addMovie")]
        public async Task<IActionResult> AddMovies(MovieDto movieDto)
        {
            var test = await Task.FromResult(0);

           var validator = new MovieDtoValidator();
            var result = validator.Validate(movieDto);

            if (!result.IsValid)
            {
                return BadRequest(new { Errors = result.Errors.Select(x => x.ErrorMessage).ToList() });
            }
            var addMovie = await _mediator.Send(new AddMovieCommand { MovieDto = movieDto });
            return Ok(addMovie);

        }
        [HttpPut("updateMovie")]
        public async Task<IActionResult> updateMovies(UpdateMovieDto updateMovieDto)
        {
           // var test = await Task.FromResult(0);

           // var validator = new UpdateMovieDtoValidator();
           // var result = validator.Validate(updateMovieDto);

            //if (!result.IsValid)
            //{
            //    return BadRequest(new { Errors = result.Errors.Select(x => x.ErrorMessage).ToList() });
            //}
            var updateMovie = await _mediator.Send(new UpdateMovieCommand { movieDto = updateMovieDto });
            return Ok(updateMovie);
        }

        [HttpDelete("deleteMovie")]
        public async Task<IActionResult> deleteMovies(int movieId)
        {
            var deleteMovie = await _mediator.Send(new DeleteMovieCommand { MovieId = movieId });
            return Ok(deleteMovie);
        }
        //[HttpGet("getAllMovie")]
        //public async Task<IActionResult> GetAllMovies([FromQuery] string s)
        //{
        //    var allMovie = await _mediator.Send(new GetAllMovieQuery { s = s });
        //    return Ok(allMovie);
        //}

        [HttpGet("getAllMovie")]
        public async Task<IActionResult> getAllMovies([FromQuery] string s, [FromQuery] string apikey)
        {
            

            // Call the query with the search string
            var allMovie = await _mediator.Send(new GetAllMovieQuery { s = s, apiKey=apikey });
            return Ok(allMovie);
        }

        [HttpGet("getAllMovieData")]
        public async Task<IActionResult> getAllMoviesData()
        {
            var totalmovie = await _mediator.Send(new GetAllMovieData {  });
            return Ok(totalmovie);
        }

    }
}
