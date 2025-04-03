using Application.Interfaces.Services;
using DataContext;
using Domain;
using Domain.Enums;
using Infrastructure.Interfaces;
using Infrastructure.Models.Menu;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class MenuService : IMenuService
{
    public readonly RestaurantDataContext _db;
    private readonly IFileStorageService _fileStorageService;

    public MenuService(RestaurantDataContext db,
                       IFileStorageService fileStorageService)
    {
        _db = db;
        _fileStorageService = fileStorageService;
    }

    public IList<MealModel> GetMeals(int categoryId)
    {
        var meals = _db.Meals
            .Include(m => m.Category)
            .Where(m => m.Category.Id == categoryId)
            .ToList();

        var result = meals.Select(meal => new MealModel
        {
            Id = meal.Id,
            Name = meal.Name,
            CategoryId = meal.Category.Id,
            Price = meal.Price,
            Weight = meal.Weight,
            ImageUrl = meal.ImageUrl,
            Description = meal.Description
        }).ToList();

        return result;
    }

    public MealModel GetMealById(int id)
    {
        var meal = _db.Meals
            .Include(m => m.Category)
            .FirstOrDefault(m => m.Id == id);
        if (meal == null)
        {
            return new MealModel();
        }

        return new MealModel
        {
            Id = meal.Id,
            Name = meal.Name,
            CategoryId = meal.Category.Id,
            Price = meal.Price,
            Weight = meal.Weight,
            ImageUrl = meal.ImageUrl,
            Description = meal.Description
        };
    }

    public IList<CategoryItemModel> GetCategories()
    {
        IList<CategoryItemModel> categories = _db.MealCategories
                .Select(category => new CategoryItemModel
                {
                    Id = category.Id,
                    Name = category.Name,
                    ImageUrl = category.ImageUrl
                })
                .ToList();


        return categories;
    }

    public async Task AddMealToMenu(string name, int categoryId, double price, double? weight, IFormFile image, string description)
    {
        var category = _db.MealCategories.Where(c => c.Id == categoryId).FirstOrDefault();
        if (category == null)
            throw new Exception("there is no such category");

        if (await _db.Meals.AnyAsync(m => m.Name == name))
            throw new Exception("there already exist meal with same name");

        var newMeal = new Meal
        {
            Name = name,
            Category = category,
            Price = price,
            Weight = weight,
            ImageUrl = await _fileStorageService.UploadFileAsync(image, FileSpecification.MealImg),
            Description = description
        };

        await _db.Meals.AddAsync(newMeal);
        await _db.SaveChangesAsync();
    }

    public void DeleteMealFromMenu(int id)
    {
        var meal = _db.Meals.FirstOrDefault(c => c.Id == id);
        if (meal == null)
        {
            throw new Exception("there is no such meal");
        }

        _db.Meals.Remove(meal);
        _db.SaveChanges();
    }

    public async Task UpdateMeal(long id, string name, int categoryId, double price, double weight, IFormFile image, string? description)
    {
        var meal = _db.Meals.FirstOrDefault(c => c.Id == id);

        if (meal == null)
            throw new Exception("there is no such meal");

        if (name != null && name != meal.Name && await _db.Meals.AnyAsync(m => m.Name == name))
            throw new Exception("there already exist meal with same name");

        meal.Name = name ?? meal.Name;

        if (categoryId != -1)
        {
            var category = _db.MealCategories.FirstOrDefault(c => c.Id == categoryId);
            if (category == null)
                throw new Exception("there is no such meal category");
            meal.Category = category;
        }

        meal.Price = price == -1 ? meal.Price : price;
        meal.Weight = weight == -1 ? meal.Weight : weight;
        if (image != null)
            await _fileStorageService.ChangeFile(image, meal.ImageUrl, FileSpecification.MealImg);

        meal.Description = description ?? meal.Description;

        _db.SaveChanges();
    }
}
