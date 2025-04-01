using Microsoft.AspNetCore.Http;

namespace Application.Commands.MealCategory;

public class UpdateMealCategoryCommand
{
	public long Id { get; set; }
	public string? Name { get; set; }
	public IFormFile? Image { get; set; }
}
