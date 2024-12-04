using App.core.App.Cart.Command;
using App.core.App.Cart.Query;
using App.core.Model.Cart;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EComApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CartController(IMediator mediator)
        {
            _mediator = mediator;
        }
      
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCartProduct(int userId)
        {
            var cartDto = await _mediator.Send(new GetCartDetailsQuery(userId));
            return Ok(cartDto);
        }
        [HttpDelete("{cartId}")]
        public async Task<IActionResult> DeleteItem(int cartId)
        {
            var cartid=await _mediator.Send(new RemoveCartCommand { CartId = cartId });
            return Ok(cartid);
        }
        [HttpPost("incrementcart")]
        public async Task<IActionResult> incrementQuantity(IncrementCartQuantityDto incrementCartQuantityDto)
        {
           var cartQuanity=await _mediator.Send(new IncrementCartCommand { incrementCartQuantityDto= incrementCartQuantityDto });
            return Ok(cartQuanity);
        }

        [HttpPost("decrementcart")]
        public async Task<IActionResult> decrementQuantity(DecrementCartQuantityDto decrementCartQuantityDto)
        {
            var cartQuanityDecrement = await _mediator.Send(new DecrementCartCommand { decrementCartQuantityDto = decrementCartQuantityDto });
            return Ok(cartQuanityDecrement);
        }

        [HttpPost("AddToCart")]
        public async Task<IActionResult> AddToCartProduct(AddToCartDto cartDto)
        {
            var addCart = await _mediator.Send(new AddToCartCommand { AddToCartDto = cartDto });
            return Ok(addCart);
        }

        [HttpPost("AddPayment")]
        public async Task<IActionResult> AddToPayment(CartPaymentDto cartPaymentDto)
        {
            var addPayment = await _mediator.Send(new AddPaymentCommand { CartPaymentDto = cartPaymentDto });
            return Ok(addPayment);
        }
    }
}
