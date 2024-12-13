using App.Core.Apps.Command;
using App.Core.Apps.Query;
using Domain.Model;
using Domain.Model.ValidationDTO;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost("register")]
        public async Task<IActionResult> AddUser(UserDTO userDTO)
        {
            var test = await Task.FromResult(0);

            var validator = new UserDtoValidator();
            var result = validator.Validate(userDTO);

            if (!result.IsValid)
            {
                
                return BadRequest(new {Errors=result.Errors.Select(x=>x.ErrorMessage).ToList() });
            }
            var register = await _mediator.Send(new CreateUserCommand { UserDTO = userDTO });
            return Ok(register);

          }

        [HttpPost("/loginUser")]
        public async Task<IActionResult> LoginAgent(LoginDTO model)
        {
            var test = await Task.FromResult(0);

            var validator = new LoginDtoValidator();
            var result = validator.Validate(model);

            if(!result.IsValid)
            {
                return BadRequest(new { Errors = result.Errors.Select(x => x.ErrorMessage).ToList() });
            }
            var userLogin = await _mediator.Send(new UserLoginQuery { loginDTO = model });
            return Ok(userLogin);
        }

        [HttpGet("GetAllUser")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> GetAllUser()
        {
            var allUser = await _mediator.Send(new getAllUserQuery());
            return Ok(allUser);
        }

    }
}
