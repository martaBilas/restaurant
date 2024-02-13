using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.Interfaces;
using Infrastructure.Models;

namespace restaurant.Server.Controllers;

[Route("api/[controller]")]
[ApiController]


public class MenuController : ControllerBase
{
    private readonly ICatalogService _catalogService;
    private readonly IMealService _mealService;

    public MenuController(ICatalogService catalogService, IMealService mealService)
    {
        _catalogService = catalogService;
        _mealService = mealService;
    }

    [HttpGet("GetCategories")]
    public IActionResult GetCategories()
    {
        IList<CategoryItemModel> categories = _catalogService.GetCategories();

        if (categories == null)
            return NotFound();

        return Ok(categories);
    }

    [HttpGet("GetMeals")]
    public IActionResult GetMeals(int categoryId)
    {
        return Ok(_mealService.GetMeals(categoryId));
    }

    [HttpGet("getMealById")]
    public IActionResult GetMealById(int id)
    {
        return Ok(_mealService.GetMealById(id));
    }
}
