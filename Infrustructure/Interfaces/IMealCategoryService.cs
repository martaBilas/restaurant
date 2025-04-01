using Microsoft.AspNetCore.Http;

namespace Infrastructure.Interfaces;

public interface IMealCategoryService
{
	Task AddMealToMenu(string name, IFormFile image);
}
