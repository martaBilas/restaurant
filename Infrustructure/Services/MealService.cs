﻿using DataContext;
using Domain;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class MealService : IMealService
{
    public readonly RestaurantDataContext _db;
    public MealService(RestaurantDataContext db)
    { _db = db; }

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

}
