using Microsoft.AspNetCore.Http;

namespace Application.Commands.MealCategory;

public class AddMealCategoryCommand
{
	public string Name { get; set; }
	public IFormFile Image { get; set; }
}
