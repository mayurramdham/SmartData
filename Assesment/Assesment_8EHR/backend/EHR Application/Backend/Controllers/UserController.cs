using App.Core.Apps.User.Command;
using Domain.Model.AuthProcessDto;
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
        [HttpPost("RegisterProvider")]
        public async Task<IActionResult> registerProvider(UserDto user)
        {
            var userResponse = await _mediator.Send(new RegisterUserCommand { User = user });
            return Ok(userResponse);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Otp([FromBody] LoginDto logins)
        {
            var otp = await _mediator.Send(new LoginCommand  { LoginDto = logins });
            return Ok(otp);
        }
        [HttpPost("verifyotp")]
        public async Task<IActionResult> login([FromBody] OtpDto otp)
        {
            var login = await _mediator.Send(new VeryOtpCommand { otpDto = otp });
            return Ok(login);
        }


    }
}
