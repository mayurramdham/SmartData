using App.core.App.Cart.Query;
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
            _mediator=mediator;
        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCartProduct(int userId)
        {
            var cartDto = await _mediator.Send(new GetCartDetailsQuery(userId ));
            return Ok(cartDto);
        }
    }
}
