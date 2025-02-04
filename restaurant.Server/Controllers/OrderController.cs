using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Models.Order;
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
        public IActionResult DecrementAmount([FromBody] int mealId)
        {
            try
            {
                var anonId = _anonCustomerService.GetAnonCustomer();
                var amount = _orderService.UptadeAmount(anonId.Value, mealId, false);
                return Ok(amount);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while decrement the amount: {ex.Message}");
            }

        }

        [HttpPut("IncrementAmount")]
        public IActionResult IncrementAmount([FromBody] int mealId)
        {
            try
            {
                var anonId = _anonCustomerService.GetAnonCustomer();
                var amount = _orderService.UptadeAmount(anonId.Value, mealId, true);
                return Ok(amount);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while increment the amount: {ex.Message}");
            }
        }

        [HttpDelete("deleteOrderRow")]
        public IActionResult DeleteMeal([FromBody] int mealId)
        {
            var anonId = _anonCustomerService.GetAnonCustomer();
            _orderService.DeleteOrderRow(anonId.Value, mealId);
            return Ok();
        }

        [HttpPost("placeOrder")]
        public IActionResult PlaceOrder([FromBody]PlaceOrderModel model)
        {
            try
            {
                var anonId = _anonCustomerService.GetAnonCustomer();
                if (ModelState.IsValid)
                {
                    _orderService.PlaceOrder(anonId.Value, model.Name, model.Surname, model.Address, model.Email, model.Phone, model.PaymentType, model.AdditionalInfo);
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while plaicng order: {ex.Message}");
            }
        }


    }
}
