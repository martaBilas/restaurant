using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace restaurant.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        public readonly IAnonCustomerService _anonCustomerService;
        public readonly IOrderService _orderService;

        public OrderController(IAnonCustomerService anonCustomerService, IOrderService orderService)
        {
            _anonCustomerService = anonCustomerService;
            _orderService = orderService;
        }

        [HttpPost("addMealToOrder")]
        public ActionResult AddMealToOrder([FromBody] AddMealModel addModel)
        {
            var anonimusId = _anonCustomerService.CreateAnonCustomer();
            _orderService.AddOrUpdateOrder(anonimusId, addModel.MealId, addModel.Amount);
            return Ok("added to cart");

        }

        [HttpGet("GetOrder")]
        public IActionResult GetOrder()
        {
            var anonId = _anonCustomerService.GetAnonCustomer();
            if (anonId == null)
                return Ok(new OrderModel());
            var model = _orderService.GetOrder(anonId);
            return Ok(model);
        }

        [HttpPut("DecrementAmount")]
        public IActionResult DecrementAmount([FromBody] int rowId)
        {
            var anonId = _anonCustomerService.GetAnonCustomer();
            var data = _orderService.UptadeAmount(anonId.Value, rowId, false);
            return Ok(data);
        }

        [HttpPut("IncrementAmount")]
        public IActionResult IncrementAmount([FromBody] int rowId)
        {
            var anonId = _anonCustomerService.GetAnonCustomer();
            var data = _orderService.UptadeAmount(anonId.Value, rowId, true);
            return Ok(data);
        }

        [HttpDelete("deleteOrderRow")]
        public IActionResult DeleteMeal([FromBody] int mealId)
        {
            var anonId = _anonCustomerService.GetAnonCustomer();
            _orderService.DeleteOrderRow(anonId.Value, mealId);
            return Ok();
        }

    }
}
