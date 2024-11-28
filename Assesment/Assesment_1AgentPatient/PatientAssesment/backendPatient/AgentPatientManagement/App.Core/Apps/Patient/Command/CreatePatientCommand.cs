using App.Core.Interface;
using Domain;
using Domain.ModelDto;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.Patient.Command
{



    public class CreatePatientCommand : IRequest<object>
    {
        public PatientDto Patient { get; set; }
    }


    public class CreatePatientCommandHandler : IRequestHandler<CreatePatientCommand, object>
    {
        private readonly IAppDbContext _appDbContext;

        public CreatePatientCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<object> Handle(CreatePatientCommand request, CancellationToken cancellationToken)
        {
            var patient = request.Patient;


            var agent = await _appDbContext.Set<Domain.Agent>().Include(a => a.Patients)
           .FirstOrDefaultAsync(a => a.AId == request.Patient.AId, cancellationToken);

            if (agent == null)
            {
                throw new Exception("Agent not found.");
            }
            var lastPatient = agent.Patients.OrderByDescending(p => p.PId).FirstOrDefault();
            string newPatientId;

            var agentData = await _appDbContext.Set<Domain.Agent>().FindAsync(patient.AId);

            if (lastPatient == null)
            {
                newPatientId = $"{agentData.AgentId}00001"; // First patient for this agent  
            }
            else
            {
                int numericPart = int.Parse(lastPatient.PatientId.Substring(agentData.AgentId.Length));
                newPatientId = $"{agentData.AgentId}{(numericPart + 1).ToString("D5")}"; // Increment patient number  
            }


            var newPatient = new Domain.Patient
            {

                PatientId = newPatientId,
                FirstName = patient.FirstName,
                LastName = patient.LastName,
                Age = patient.Age,
                Gender = patient.Gender,
                Email = patient.Email,
                PhoneNumber = patient.PhoneNumber,
                Address = patient.Address,
                City = patient.City,
                State = patient.State,
                Country = patient.Country,
                PostalCode = patient.PostalCode,
                BloodType = patient.BloodType,
                Medications = patient.Medications,
                LastVisitDate = patient.LastVisitDate,
                NextAppointmentDate = patient.NextAppointmentDate,
                InsuranceProvider = patient.InsuranceProvider,
                InsurancePolicyNumber = patient.InsurancePolicyNumber,
                HasAgreeToTerms = patient.HasAgreeToTerms,
                IsPatientActive = true,
                AId = patient.AId,
            };

            

            await _appDbContext.Set<Domain.Patient>().AddAsync(newPatient);

            await _appDbContext.SaveChangesAsync(cancellationToken);

            var response = new
            {
                status = 200,
                message = "Patients Added Sucessfully",
                data = newPatient
            };
            return response;
        }

    }




}

