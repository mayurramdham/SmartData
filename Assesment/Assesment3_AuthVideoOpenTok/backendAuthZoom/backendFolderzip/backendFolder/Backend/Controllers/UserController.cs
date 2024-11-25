using App.Core.Apps.Command;
using App.Core.Apps.Query;
using Domain.Model;
using MediatR;
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


        [HttpPost]
        public async Task<IActionResult> RegisterAgent(UserDto model)
        {
            var isAgentAdded = await _mediator.Send(new CreateUserCommand { User = model });
            return Ok(isAgentAdded);
        }

        [HttpPost("/loginUser")]
        public async Task<IActionResult> LoginAgent(LoginDto model)
        {
            var isAgentValidate = await _mediator.Send(new UserLoginQuery { Login = model });
            return Ok(isAgentValidate);
        }
    }
}
