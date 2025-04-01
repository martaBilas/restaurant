using Application.Interfaces.Services;
using DataContext;
using Domain;
using Domain.Enums;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class MealCategoryService : IMealCategoryService
{
	public readonly RestaurantDataContext _db;
	private readonly IFileStorageService _fileStorageService;

	public MealCategoryService(RestaurantDataContext db,
							   IFileStorageService fileStorageService)
	{
		_db = db;
		_fileStorageService = fileStorageService;
	}

	public async Task AddMealToMenu(string name, IFormFile image)
	{
		if (await _db.MealCategories.AnyAsync(c => c.Name == name))
			throw new Exception("there already exist category with same name");

		await _db.MealCategories.AddAsync(new MealCategory
		{
			Name = name,
			ImageUrl = await _fileStorageService.UploadFileAsync(image, FileSpecification.CategoryImg)
		});
		await _db.SaveChangesAsync();
	}
}
