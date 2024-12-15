using App.Core.Apps.Appointment.Command;
using App.Core.Apps.Appointment.Query;
using App.Core.Apps.DropDown;
using Domain.Model.AuthProcessDto;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IMediator _mediator;
        public AppointmentController(IMediator mediator)
        {
            _mediator=mediator;
        }
        [HttpGet]
        public async Task<IActionResult> getspecialisation()
        {
            var speality = await _mediator.Send(new GetSpecilatyQuery());
            return Ok(speality);
        }

        [HttpGet("getSpecilisationById/{Id}")]
        public async Task<IActionResult> getProviderSpeciality(int Id)
        {
            var getUser = await _mediator.Send(new GetProviderBySpecialityQuery { Id = Id });
            return Ok(getUser);
        }

        [HttpPost("bookAppointment")]
        public async Task<IActionResult> addAppointment([FromBody] AppointmentDto appointments)
        {
            var appointment = await _mediator.Send(new AddAppointmentCommand { AppointmentDto = appointments });
            return Ok(appointment);
        }


    }
}
