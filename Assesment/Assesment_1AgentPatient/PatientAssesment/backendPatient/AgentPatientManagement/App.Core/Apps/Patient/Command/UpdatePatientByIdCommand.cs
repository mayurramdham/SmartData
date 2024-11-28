using App.Core.Interface;
using Domain;
using Domain.ModelDto;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace App.Core.Apps.Patient.Command
{
    public class UpdatePatientByIdCommand : IRequest<bool>
    {
        public PatientDto Patient { get; set; }
        public int Id { get; set; }
    }



    public class UpdatePatientByIdCommandHandler : IRequestHandler<UpdatePatientByIdCommand, bool>
    {

        private readonly IAppDbContext _appDbContext;

        public UpdatePatientByIdCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }


        public async Task<bool> Handle(UpdatePatientByIdCommand request, CancellationToken cancellationToken)
        {
            var id = request.Id;

            var patient = await _appDbContext.Set<Domain.Patient>().FindAsync(id);

            if (patient == null)
            {
                return false;
            }

            patient.FirstName = request.Patient.FirstName;
            patient.LastName = request.Patient.LastName;
            patient.Email = request.Patient.Email;
            patient.PhoneNumber = request.Patient.PhoneNumber;
            patient.Address = request.Patient.Address;
            patient.City = request.Patient.City;
            patient.State = request.Patient.State;
            patient.Country = request.Patient.Country;
            patient.PostalCode = request.Patient.PostalCode;
            patient.BloodType = request.Patient.BloodType;
            patient.Medications = request.Patient.Medications;
            patient.LastVisitDate = request.Patient.LastVisitDate;
            patient.NextAppointmentDate = request.Patient.NextAppointmentDate;
            patient.InsuranceProvider = request.Patient.InsuranceProvider;
         
            patient.HasAgreeToTerms = request.Patient.HasAgreeToTerms;
          



            await _appDbContext.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
 
 
  
  
   
 







}
