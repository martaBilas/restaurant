using DataContext;
using Domain;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class CatalogService: ICatalogService
{
    private readonly RestaurantDataContext _db;

    public CatalogService(RestaurantDataContext db)
    {
        _db = db;
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
}
