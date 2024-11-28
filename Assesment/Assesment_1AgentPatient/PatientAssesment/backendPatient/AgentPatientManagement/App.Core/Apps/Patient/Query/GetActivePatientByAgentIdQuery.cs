using App.Core.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Apps.Patient.Query
{
    public class GetActivePatientByAgentIdQuery : IRequest<List<Domain.Patient>>
    {
        public int Agentid { get; set; }
    }



    public class GetActivePatientByAgentIdQueryHandler : IRequestHandler<GetActivePatientByAgentIdQuery, List<Domain.Patient>>
    {
        private readonly IAppDbContext _appDbContext;

        public GetActivePatientByAgentIdQueryHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<List<Domain.Patient>> Handle(GetActivePatientByAgentIdQuery request, CancellationToken cancellationToken)
        {
            var allPatient = await _appDbContext.Set<Domain.Patient>().Where(pat => pat.IsPatientActive == true && pat.AId == request.Agentid).ToListAsync();

            return allPatient;
        }
    }


}
