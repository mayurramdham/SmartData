using App.Core.Apps.Command;
using App.Core.Apps.Query;
using Domain.Entity;
using Domain.Model;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers.Otp
{
    [Route("api/[controller]")]
    [ApiController]
    public class OtpController : ControllerBase
    {

        private readonly IMediator _mediator;   
        public OtpController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("sendOtp/{name}")]
        public async Task<IActionResult> RegisterAgent(string name)
        {
            var sendOtp = await _mediator.Send(new SendEmailCommand { UserName = name });
            return Ok(sendOtp);
        }

        [HttpPost("VerifyOtp")]
        public async Task<IActionResult> VerifyOtp(ValidateDto  otp)
        {
            var Otp = await _mediator.Send(new ValidateOtpQuery { EmailOtp = otp });
            return Ok(Otp);
        }
        

        
    }
}
