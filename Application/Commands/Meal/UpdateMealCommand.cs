using Microsoft.AspNetCore.Http;

namespace Application.Commands.Meal;

public class UpdateMealCommand 
{
	public long Id { get; set; }
	public string? Name { get; set; } = null;
	public int? CategoryId { get; set; } = -1;
	public double? Price { get; set; } = -1;
	public double? Weight { get; set; } = -1;
	public IFormFile? Image { get; set; } = null;
	public string? Description { get; set; } = null;
	public bool IsActive { get; set; }
}
