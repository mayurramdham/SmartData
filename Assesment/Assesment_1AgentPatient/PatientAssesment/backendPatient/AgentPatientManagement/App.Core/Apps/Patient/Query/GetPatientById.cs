using App.Core.Interface;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.Patient.Query
{
    public class GetPatientById : IRequest<Domain.Patient>
    {
        public int patientId { get; set; }
    }

    internal class GetPatientByIdHandler : IRequestHandler<GetPatientById, Domain.Patient>
    {
        private readonly IAppDbContext _appDbContext;

        public GetPatientByIdHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<Domain.Patient> Handle(GetPatientById request, CancellationToken cancellationToken)
        {
            var patient = await _appDbContext.Set<Domain.Patient>()
                .FirstOrDefaultAsync(p => p.PId == request.patientId);

            if (patient == null) return null;

            return patient;
        }
    }
}
