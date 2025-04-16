using Microsoft.AspNetCore.Http;

namespace Application.Commands.Meal;

public class AddMealCommand
{
	public string Name { get; set; }
	public int CategoryId { get; set; }
	public double Price { get; set; }
	public double Weight { get; set; }
	public IFormFile Image { get; set; }
	public string? Description { get; set; }
	public bool IsActive { get; set; }	
}
