using App.Core.Interface;
using Infrastructure.Service;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace Backend.Controllers.OpenTok
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpenTokController : ControllerBase
    {
        //private readonly OpenTokService _openTok;

        //public OpenTokController(OpenTokService openTok)
        //{
        //    _openTok = openTok;
        //}
        private readonly ICallService _openTokService; // Use the interface if you've registered it as ICallService

        public OpenTokController(ICallService openTokService)
        {
            _openTokService = openTokService;
          
        }
        [HttpGet("session")]
        public IActionResult CreateSession()
        {
            var session = _openTokService.CreateSession("1dea0a2c", "hOtsTKu46RyJJ8Ie");
            return Ok(new
            {
                SessionId = session.Id
            });
        }        

        [HttpPost("token")]
        public IActionResult GenerateToken([FromBody] string sessionId)
        {
            var token = _openTokService.GenerateToken(sessionId);
            return Ok(new
            {
                Token = token
            });
        }
    }
}
