using Domain;
using Infrastructure.Models;

namespace Infrastructure.Interfaces;

public interface IMealService
{
    MealModel GetMealById(int id);
    IList<MealModel> GetMeals(int categoryId);
}
