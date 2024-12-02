using App.core.App.Product.Command;
using App.core.App.Product.Query;
using App.core.App.User.Command;
using App.core.Model.Product;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EComApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ProductController(IMediator mediator)
        {
            _mediator=mediator;
        }
        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProduct([FromForm] ProductDto productDto)
        {
            // Send the request to the mediator to add the product
            var response = await _mediator.Send(new AddProductCommad { product = productDto });
            return Ok(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetProduct()
        {
            // Send the request to the mediator to add the product
            var response = await _mediator.Send(new getAllProductQuery {  });

            // Return the response (status and data) as an OK result
            return Ok(response);
        }

    }
}
