using App.Core.Apps.User.Command;
using App.Core.Apps.User.Query;
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
                cfg.RegisterServicesFromAssemblyContaining<RegisterUserCommand>();
                cfg.RegisterServicesFromAssemblyContaining<GetUserByEmailQuery>();

            });
            return services;
        }
    }
}
