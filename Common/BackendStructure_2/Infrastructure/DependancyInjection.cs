using App.Core.Interface;
using Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public static  class DependancyInjection
    {
        public static IServiceCollection AddInfraStructure(this IServiceCollection services,IConfiguration configuration)
        {
            services.AddScoped<IAppDbContext,AppDbContext>();
            services.AddDbContext<AppDbContext>((provider, options) =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"),
                    b=>b.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName));
            });
            return services;
        }
    }
}
