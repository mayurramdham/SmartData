using Infrastructure.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZoomController : ControllerBase
    {
        private readonly ZoomService _zoomService;
        private readonly HttpClient _httpClient;

        // Inject ZoomService using constructor injection
        public ZoomController(ZoomService zoomService, HttpClient httpClient)
        {
            _zoomService = zoomService;
            _httpClient = httpClient;
        }

        [HttpGet("CreateMeeting")]
        public async Task<IActionResult> CreateMeeting()
        {
            var data = await _zoomService.CreateMeetingAsync();
           var response=new
            {
                Status = 200,
                Message = "Meeting Created Successfully",
                Data = data
            };
            return Ok(response);
        }
    }
}