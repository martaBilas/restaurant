using Microsoft.AspNetCore.Mvc;
using Infrastructure.Interfaces;
using Infrastructure.Models.Menu;

namespace restaurant.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MenuController : ControllerBase
{
    private readonly IMenuService _menuService;

    public MenuController( IMenuService mealService)
    {
        
        _menuService = mealService;
    }

    [HttpGet("GetCategories")]
    public IActionResult GetCategories()
    {
        IList<CategoryItemModel> categories = _menuService.GetCategories();

        if (categories == null)
            return NotFound();

        return Ok(categories);
    }

    [HttpGet("getCategoryById/{id}")]
    public IActionResult GetCategoryById([FromRoute] int id)
    {
        var meal = _menuService.GetCategoryById(id);
        if (meal == null)
        {
            return NotFound();
        }

        return Ok(meal);
    }

    [HttpGet("GetMeals")]
    public IActionResult GetMeals(int categoryId)
    {
        return Ok(_menuService.GetMeals(categoryId));
    }

    [HttpGet("getMealById/{id}")]
    public IActionResult GetMealById([FromRoute] int id)
    {
        var meal = _menuService.GetMealById(id);
        if (meal == null)
        {
            return NotFound();
        }

        return Ok(meal);
    }

}
