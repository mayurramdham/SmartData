using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using WebApplication1.IService;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StripeController : Controller
    {
        private readonly IStripeService _stripeService;
        public StripeController( IStripeService stripeService)
        {
            _stripeService = stripeService;
        }

        [HttpPost("CreateStripePayment")]
        public async Task<JsonResult> CreateStripePayment([FromBody] Striprequestmodel striprequestmodel)
        {
            var paymentIntent = await _stripeService.CreateStripePayment(striprequestmodel);

            if (paymentIntent.Id != null)
            {
                return Json(new { success = true, paymentIntent });
            }
            else
            {
                return Json(new { success = false, paymentIntent, message = paymentIntent.Status });
            }
        }

       
    }
}
