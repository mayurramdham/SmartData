//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Hosting;

//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Infrastructure.Services
//{
//    public class ImageService
//    {
//        private readonly IWebHostEnvironment _environment;
//        private readonly IHttpContextAccessor _httpContextAccessor;
       
//        public ImageService(IWebHostEnvironment environment, IHttpContextAccessor httpContextAccessor)
//        {
//            _environment = environment;
//            _httpContextAccessor = httpContextAccessor;
//        }



//        public async Task<string> Upload(IFormFile file)
//        {

//            // Valid extensions
//            List<string> validExtensions = new List<string>() { ".jpg", ".png", ".jpeg" };
//            string extension = Path.GetExtension(file.FileName);
//            if (!validExtensions.Contains(extension))
//            {
//                return  $"Extensions Not Valid {string.Join(',', validExtensions)}";
//            }

//            // Size check
//            long size = file.Length;
//            if (size > (5 * 1024 * 1024))
//            {
//                return "Maximum size can be 5Mb";
//            }

//            // Change file name
//            string filename = Guid.NewGuid().ToString() + extension;
//            string uploadPath = Path.Combine(_environment.ContentRootPath, "wwwroot/Images");

//            if (!Directory.Exists(uploadPath))
//            {
//                Directory.CreateDirectory(uploadPath);
//            }

//            using (FileStream stream = new FileStream(Path.Combine(uploadPath, filename), FileMode.Create))
//            {
//                file.CopyTo(stream)
//;
//            }

//            // Get the host and scheme from HttpContext
//            var request = _httpContextAccessor.HttpContext.Request;
//            string scheme = request.Scheme;
//            string host = request.Host.Value;

//            // Generate the full URL
//            string fileUrl = $"{scheme}://{host}/wwwroot/Images/{filename}";

//            return $"{ fileUrl} File Saved Successfully";
//        }
//    }
//}

