using Infrastructure.Models.Menu;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Interfaces;

public interface IMenuService
{
	Task AddMealToMenu(string name, int categoryId, double price, double? weight, IFormFile image, string description);
	void DeleteMealFromMenu(int id);
	IList<CategoryItemModel> GetCategories();
	MealModel GetMealById(int id);
	IList<MealModel> GetMeals(int categoryId);
	Task UpdateMeal(long id, string name, int categoryId, double price, double weight, IFormFile image, string? description);
}
