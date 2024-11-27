using App.Core.Interface;
using Domain.Entity;
using Domain.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.Patient
{
    public class AddPatientCommand : IRequest<object>
    {
        public Domain.Model.PatientDTO patientDTO { get; set; }
    }
    public class AddPatientCommandHandler : IRequestHandler<AddPatientCommand, object>
    {
        private readonly IAppDbContext _appDbContext;

        public AddPatientCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<object> Handle(AddPatientCommand request, CancellationToken cancellationToken)
        {

            var agent = await _appDbContext.Set<Domain.Entity.User>().Include(a => a.Patients)
                .FirstOrDefaultAsync(a => a.UserId == request.patientDTO.UserId, cancellationToken);
            //var agent = await _appDbContext.Set<Domain.Entity.User>().Where(x => x.UserId == request.patientDTO.UserId).FirstOrDefaultAsync();

            if (agent == null)
            {
                throw new Exception("Agent not found.");
            }
            var lastPatient = agent.Patients.OrderByDescending(p => p.PatientId).FirstOrDefault();
            string newPatientId;

            if (lastPatient == null)
            {
                newPatientId = $"{request.patientDTO.UserId}00001"; // First patient for this agent  
            }
            else
            {
                int numericPart = int.Parse(lastPatient.PatientId.Substring(request.patientDTO.UserId.Length));
                newPatientId = $"{request.patientDTO.UserId}{(numericPart + 1).ToString("D5")}"; // Increment patient number  
            }
            var pateint = new Domain.Entity.Patient
            {
                PatientId = newPatientId,
                PID = request.patientDTO.PID,
                age = request.patientDTO.age,
                FirstName = request.patientDTO.FirstName,
                LastName = request.patientDTO.LastName,
                DataOfBirth = request.patientDTO.DataOfBirth,
                UserId = request.patientDTO.UserId,
                email = request.patientDTO.email,
                phonenumber = request.patientDTO.phonenumber,
                gender = request.patientDTO.gender,
                Country = request.patientDTO.Country,
                State = request.patientDTO.State,
                practinionerName = request.patientDTO.practinionerName,
                isDeleted = request.patientDTO.isDeleted,
                isAccepted = request.patientDTO.isAccepted,
                AppointmentDate = request.patientDTO.AppointmentDate

            };

            if (!pateint.isDeleted)
            {
                await _appDbContext.Set<Domain.Entity.Patient>().AddAsync(pateint, cancellationToken);
            }

            await _appDbContext.SaveChangesAsync(cancellationToken);
            var response = new
            {
                status = 200,
                message = "Patient Added Successfuuly",
                data = lastPatient,
            };
            return response;


        }
    }
}
