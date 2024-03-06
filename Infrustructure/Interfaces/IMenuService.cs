using Domain;
using Infrastructure.Models;

namespace Infrastructure.Interfaces;

public interface IMenuService
{
    IList<CategoryItemModel> GetCategories();
    MealModel GetMealById(int id);
    IList<MealModel> GetMeals(int categoryId);
}
