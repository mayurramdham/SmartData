using App.Core.Apps.Agent.Command;
using App.Core.Apps.Agent.Query;
using Domain;
using Domain.ModelDto;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RegisterLoginForget.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgentController : ControllerBase
    {


        private readonly IMediator _mediator;

        public AgentController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpGet("get-agent-by-email/{email}")]
        public async Task<IActionResult> GetAgentById(string email)
        {
            var agent = await _mediator.Send(new GetAgentByEmailQuery { Email = email });

            if (agent == null)
            {
                return NotFound(new
                {
                    message = "Agent Not Found",
                    statusCode = 404
                });
            }


            return Ok(agent);
        }



        [HttpPost]
        public async Task<IActionResult> RegisterAgent(AgentDto model)
        {
            var isAgentAdded = await _mediator.Send(new CreateAgentCommand { Agent = model });
            return Ok(isAgentAdded);

            

           
        }


        [HttpPost("/login-agent")]
        public async Task<IActionResult> LoginAgent(LoginDto model)
        {
            var isAgentValidate = await _mediator.Send(new ValidateAgentQuery { Login = model });
            return Ok(isAgentValidate);

          

           
        }


        [HttpPost("/change-password")]
        public async Task<IActionResult> ChangePassword(ChangeAgentPasswordDto model)
        {
            var isPasswordChange = await _mediator.Send(new ChangeAgentPasswordCommand { AgentPasswordDto = model });
             return Ok(isPasswordChange);
        }




    }
}
