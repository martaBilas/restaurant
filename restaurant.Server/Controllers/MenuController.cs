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

    public MenuController(ICatalogService catalogService)
    { _catalogService = catalogService; }

    [HttpGet("GetCategories")]
     public IActionResult GetCategories()
        {
            IList<CategoryItemModel> categories = _catalogService.GetCategories();

            if (categories == null)
                return NotFound();

            return Ok(categories);
        }
}
