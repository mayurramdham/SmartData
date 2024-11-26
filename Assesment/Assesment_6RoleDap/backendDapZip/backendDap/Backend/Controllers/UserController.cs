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

        [HttpGet("getPage/{pageSize}/{pageNumber}")]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> GetUsers(int pageSize, int pageNumber)
        {
            var users = await _mediator.Send(new getUserQuery { PageNumber=pageNumber,PageSize=pageSize});
            return Ok(users);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetUserById(int Id)
        {
            var user = await _mediator.Send(new getUserByIdQuery { Id = Id });

            if (user == null)
            {
                return NotFound($"User with ID {Id} not found.");
            }

            return Ok(user);
        }

        [HttpGet("GetAllUser")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> GetAllUser()
        {
            var allUser = await _mediator.Send(new getAllUserQuery());
            return Ok(allUser);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatientById(int id)
        {
            var isDeleted = await _mediator.Send(new deleteUserCommand { Id = id });

           

            return Ok(isDeleted);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePatientById(updateUserDto model)
        {
            var isUpdated = await _mediator.Send(new UpdateUserCommand { updateDto = model });

            

            return Ok(isUpdated);
        }

    }
}
