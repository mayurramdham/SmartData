using App.core.App.User.Command;
using App.core.Model.Register;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EComApplication.Controllers
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
        public async Task<IActionResult> Register([FromForm] UserDto user, IFormFile profileImage)
        {
            var userId = await _mediator.Send(new RegisterUserCommand { UserDto= user });
            return Ok(userId);
        }
        [HttpPost("Otp")]
        public async Task<IActionResult> Otp([FromBody] LoginDto logins)
        {
            var otp = await _mediator.Send(new SendOtpCommand { LoginDto = logins });
            return Ok(otp);
        }

        [HttpPost("login")]
        public async Task<IActionResult> login([FromBody] OtpDto otp)       
        {
            var login = await _mediator.Send(new LoginOtpCommand { otpDto = otp });
            return Ok(login);
        }

        [HttpPost("ForgetPassword")]
        public async Task<IActionResult> ForgetPassword([FromBody] ForgotPasswordCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }
    }
}
