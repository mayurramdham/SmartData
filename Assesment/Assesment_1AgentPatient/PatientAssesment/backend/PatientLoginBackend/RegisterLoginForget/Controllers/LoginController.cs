//using App.Core.Apps.Patient;
using App.Core.Apps.User.Command;
using App.Core.Apps.User.Query;
using Domain.Entity;
using Domain.Model;
using Domain.ModelDto;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RegisterLoginForget.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IMediator _mediator;

        public LoginController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("getemail/{email}")]
        public async Task<IActionResult> GetCustomerById(string email)
        {
            var user = await _mediator.Send(new GetUserByEmailQuery { Email = email });

            if (user == null)
            {
                return NotFound("User not exists");
            }


            return Ok(user);
        }



        [HttpPost("/Register")]
        public async Task<IActionResult> RegisterUser(RegisterDTO model)
        {
            var UserAdded = await _mediator.Send(new RegisterUserCommand { User = model });
            return Ok(UserAdded);

          
        }


        [HttpPost("/loginuser")]
        public async Task<IActionResult> LoginUser(LoginDto model)
        {
            var isUserValidate = await _mediator.Send(new LoginUserQuery { Login = model });
            return Ok(isUserValidate);
        }


        [HttpPost("/ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto _changePasswordDtP)
        {
            var PasswordChange = await _mediator.Send(new ChangeUserPasswordCommand { ChangePasswordDto = _changePasswordDtP });
            return Ok(PasswordChange);
        }

        [HttpPost("/ForgetPassword")]
        public async Task<IActionResult> ForgetPassword(ResetPasswordDto _resetPasswordDTO)
        {
            var ForgetPassword = await _mediator.Send(new ForgetPassword { resetPasswordDTO = _resetPasswordDTO });
            return Ok(ForgetPassword);
        }

        //[HttpPost("/AddPatient")]
        //public async Task<IActionResult> AddPatient(PatientDTO model)
        //{
        //    var PatientAdded = await _mediator.Send(new AddPatientCommand { patientDTO = model });
        //    return Ok(PatientAdded);


        //}




    }
}
