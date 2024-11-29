
namespace EComApplication.Controllers
{
    internal class UploadHandler
    {
        private IWebHostEnvironment environment;
        private IHttpContextAccessor httpContextAccessor;

        public UploadHandler(IWebHostEnvironment environment, IHttpContextAccessor httpContextAccessor)
        {
            this.environment = environment;
            this.httpContextAccessor = httpContextAccessor;
        }
    }
}