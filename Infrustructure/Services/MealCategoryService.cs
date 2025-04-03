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

	public async Task AddMealCategory(string name, IFormFile image)
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

	public async Task UpdateMealCategory(long id, string name, IFormFile image)
	{
		var category = await _db.MealCategories.FirstOrDefaultAsync(c => c.Id == id);
		if (category == null)
			throw new Exception("there is no such category");

		if (name != null && name != category.Name && await _db.MealCategories.AnyAsync(c => c.Name == name))
			throw new Exception("there already exist category with same name");

		category.Name = name ?? category.Name;
		if (image != null)
			await _fileStorageService.ChangeFile(image, category.ImageUrl, FileSpecification.CategoryImg);

		await _db.SaveChangesAsync();
	}
}
