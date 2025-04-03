using Microsoft.AspNetCore.Http;

namespace Infrastructure.Interfaces;

public interface IMealCategoryService
{
    Task AddMealCategory(string name, IFormFile image);
    Task UpdateMealCategory(long id, string name, IFormFile image);
    Task DeleteMealCategory(long id);
}
