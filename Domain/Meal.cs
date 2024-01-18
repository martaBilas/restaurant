using Domain.Enums;

namespace Domain;

public class Meal
{
    public long Id { get; set; }
    public string Name { get; set; }
    public MealCategory Category { get; set; }
    public double Price { get; set; }
    public string ImageUrl { get; set; }
    public string Description { get; set; }
}
