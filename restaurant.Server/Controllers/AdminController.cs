using Application.Commands.Meal;
using Application.Commands.MealCategory;
using Application.Configurations;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace restaurant.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        public readonly IOrderService _orderService;
        public readonly IMenuService _menuService;
        public readonly IMealCategoryService _mealCategoryService;

        public AdminController(IMenuService menuService,
                               IOrderService orderService,
                               IMealCategoryService mealCategoryService)
        {
            _menuService = menuService;
            _orderService = orderService;
            _mealCategoryService = mealCategoryService;
        }

        //[Authorize]
        //[HttpGet("getOrdersList")]
        //public IActionResult GetOrdersList([FromQuery] int skip, int take, bool requireTotalCount)
        //{
        //    try
        //    {
        //        var orders = _orderService.GetOrdersList(skip, take, requireTotalCount);
        //        return Ok(orders);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        [HttpGet("getOrders")]
        public IActionResult GetOrdersList()
        {
            try
            {
                var orders = _orderService.GetOrdersList();
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = IdentityRoles.SuperAdmin)]
		[HttpPost("addMealToMenu")]
		public async Task<IActionResult> AddMeal([FromForm] AddMealCommand newMeal)
		{
			try
			{
				await _menuService.AddMealToMenu(newMeal.Name, newMeal.CategoryId, newMeal.Price, newMeal.Weight, newMeal.Image, newMeal.Description);
				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

        [HttpPost("addMealCategory")]
        [Authorize(Roles = IdentityRoles.SuperAdmin)]
        public async Task<IActionResult> AddMealCategory([FromForm] AddMealCategoryCommand newMealCategory)
        {
            try
            {
                await _mealCategoryService.AddMealCategory(newMealCategory.Name, newMealCategory.Image);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

		[HttpPut("updateMeal")]
        [Authorize(Roles = IdentityRoles.SuperAdmin)]
		public async Task<IActionResult> UpdateMeal([FromForm] UpdateMealCommand newMeal)
		{
			try
			{
				await _menuService.UpdateMeal(newMeal.Id, newMeal.Name, newMeal.CategoryId ?? -1, newMeal.Price ?? -1, newMeal.Weight ?? -1, newMeal.Image, newMeal.Description);
				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

        [HttpPut("updateMealCategory")]
        [Authorize(Roles = IdentityRoles.SuperAdmin)]
        public async Task<IActionResult> UpdateMealCategory([FromForm] UpdateMealCategoryCommand newMeal)
        {
            try
            {
                await _mealCategoryService.UpdateMealCategory(newMeal.Id, newMeal.Name, newMeal.Image);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpDelete("deleteMealFromMenu/{id}")]
        [Authorize(Roles = IdentityRoles.SuperAdmin)]
        public IActionResult DeleteMeal(int id)
        {
            try
            {
                _menuService.DeleteMealFromMenu(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deleteMealCategory")]
        [Authorize(Roles = IdentityRoles.SuperAdmin)]
        public async Task<IActionResult> DeleteMealCategory([FromBody] int categoryId)
        {
            try
            {
                await _mealCategoryService.DeleteMealCategory(categoryId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
