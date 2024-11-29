using App.core;
using Infrastructure;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;

namespace EComApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var configuration = builder.Configuration;

            // Add services to the container.
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowLocalhost", policy =>
                {
                    policy.WithOrigins("http://localhost:4200") // Allow frontend origin
                          .AllowAnyHeader()                   // Allow any headers
                          .AllowAnyMethod()                   // Allow any HTTP methods
                          .AllowCredentials();                // Allow credentials
                });
            });
            builder.Services.AddControllers();

            builder.Services.AddApplication();
            builder.Services.AddInfraStructure(configuration);
            builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            builder.Services.AddDataProtection().PersistKeysToFileSystem(new DirectoryInfo("../"))
.SetApplicationName("EcomApplication");

            // Add Swagger
            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "EComApplication API",
                    Version = "v1"
                });
            });

            var app = builder.Build();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
    Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Images")),
                RequestPath = "/wwwroot/Images"
            });

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("AllowLocalhost");
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
