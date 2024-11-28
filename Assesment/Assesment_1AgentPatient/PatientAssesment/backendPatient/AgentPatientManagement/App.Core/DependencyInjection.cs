using App.Core.Apps.Agent.Command;
using App.Core.Apps.Agent.Query;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssemblyContaining<ChangeAgentPasswordCommand>();
                cfg.RegisterServicesFromAssemblyContaining<CreateAgentCommand>();
                cfg.RegisterServicesFromAssemblyContaining<GetAgentByEmailQuery>();
                cfg.RegisterServicesFromAssemblyContaining<ValidateAgentQuery>();


            });
            return services;
        }
    }
}
