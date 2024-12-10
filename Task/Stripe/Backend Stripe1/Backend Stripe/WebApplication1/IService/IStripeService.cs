using Stripe;
using WebApplication1.Models;

namespace WebApplication1.IService
{
    public interface IStripeService
    {
        Task<PaymentIntent> CreateStripePayment(Striprequestmodel striprequestmodel);
   
    }
}
