using Microsoft.AspNetCore.Http;

namespace Infrastructure.Interfaces;

public interface IMealCategoryService
{
    public Task AddMealCategory(string name, IFormFile image);
    public Task UpdateMealCategory(long id, string name, IFormFile image);
    public Task DeleteMealCategory(long id);
}
