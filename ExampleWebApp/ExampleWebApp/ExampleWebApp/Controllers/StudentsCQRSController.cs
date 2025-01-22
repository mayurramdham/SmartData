using App.Core.Apps.Student.Command;
using App.Core.Apps.Student.Query;
using App.Core.Models;
using ExampleWebApp.Models;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ExampleWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsCQRSController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<StudentsCQRSController> _logger;
        private readonly IConfiguration _configuration;

        public StudentsCQRSController(IMediator mediator, ILogger<StudentsCQRSController> logger, IConfiguration configuration)
        {
            _mediator = mediator;
            _logger = logger;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Post(StudentDto model)
        {
            var studentId = await _mediator.Send(new CreateStudentCommand { Student = model });
            return Ok(studentId);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            _logger.LogInformation("Get Method");


            var studentId = await _mediator.Send(new GetStudentsQuery());
            return Ok(studentId);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> ExceptionTest()
        {
            var test = await Task.FromResult(0);

            throw new System.Exception("Test");

            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> ValidationTest(TestModelDto model)
        {
            var test = await Task.FromResult(0);

            var validator = new TestModelDtoValidator();
            var result = validator.Validate(model);

            if (!result.IsValid)
            {
                var errorMessage = result.Errors[0].ErrorMessage;
                return BadRequest(new { Errors = result.Errors.Select(x => x.ErrorMessage).ToList() });
            }

            return Ok();
        }


        [HttpPost("[action]")]
        public async Task<IActionResult> Authenticate(UserDto model)
        {
            var result = await Task.FromResult(GenerateToken(model.UserName, new List<string> { "Admin" }));
            return Ok(new { AccessToken = result });
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetDate()
        {
            var result = await Task.FromResult(DateTime.Now);
            return Ok(new { SystemDate = result });
        }

        private string GenerateToken(string userName, IList<string> roles)
        {
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JwtSettings:SecretKey"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userName),
                new Claim(ClaimTypes.NameIdentifier, Guid.NewGuid().ToString()),
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var token = new JwtSecurityToken(
                _configuration["JwtSettings:Issuer"],
                _configuration["JwtSettings:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["JwtSettings:DurationInMinutes"])),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }



        //private static (bool isValid, List<string> errors) CheckModelValidation<TModel>(AbstractValidator<TModel> validator, TModel model)
        //    where TModel : class
        //{
        //    var result = validator.Validate(model);

        //    if (!result.IsValid)
        //    {
        //        var errors = new List<string>();

        //        foreach (var item in result.Errors)
        //            errors.Add(item.ErrorMessage);

        //        return (false, errors);
        //    }

        //    return (true, new List<string>());
        //}
    }
}
