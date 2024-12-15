using App.Core.Interface;
using Domain.Entity.Appointments;
using Domain.Model.AuthProcessDto;
using Mapster;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.Appointment.Command
{
    public class AddAppointmentCommand:IRequest<object>
    {
        public AppointmentDto AppointmentDto { get; set; }
    }
    public class AddAppointmentCommandHandler:IRequestHandler<AddAppointmentCommand,object>
    {
        private readonly IAppDbContext _appDbContext;
        public AddAppointmentCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<object> Handle(AddAppointmentCommand request, CancellationToken cancellationToken)
        {
            var appointmentData = request.AppointmentDto;
            //   var bookAppointment = appointmentData.Adapt<Domain.Entity.Appointments.Appointment>();
            var appointment = new Domain.Entity.Appointments.Appointment
            {
                PatientId = request.AppointmentDto.PatientId,
                ProviderId = request.AppointmentDto.ProviderId,
                SpecialisationId = request.AppointmentDto.SpecialisationId,
                AppointmentDate = request.AppointmentDto.AppointmentDate,
                AppointmentTime = request.AppointmentDto.AppointmentTime,
                ChiefComplaint = request.AppointmentDto.ChiefComplaint,
                Fees = request.AppointmentDto.Fees
            };
            await _appDbContext.Set<Domain.Entity.Appointments.Appointment>().AddAsync(appointment, cancellationToken);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            var response = new
            {
                status = 200,
                message = "Product added successfully",
                data = appointment
            };
            return response;


        }
    }
}
