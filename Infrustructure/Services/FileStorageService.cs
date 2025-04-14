using Application.Interfaces.Services;
using Application.Options;
using Domain.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Diagnostics;

namespace Infrastructure.Services;

public class FileStorageService : IFileStorageService
{
    private readonly StorageOption _storageOptions;

    public FileStorageService(IOptions<StorageOption> storageOptions)
    {
        _storageOptions = storageOptions.Value;
    }

    public async Task<string> UploadFileAsync(IFormFile file, FileSpecification fileSpecification)
    {
        switch (fileSpecification)
        {
            case FileSpecification.MealImg:
                return await UploadFilesAsync(file, _storageOptions.MealImgPath);
            case FileSpecification.CategoryImg:
                return await UploadFilesAsync(file, _storageOptions.CategoryImgPath);
        }
        return null;
    }

    public async Task<bool> ChangeFile(IFormFile file, string fileName, FileSpecification fileSpecification)
    {
        switch (fileSpecification)
        {
            case FileSpecification.MealImg:
                return await ChangeFileAsync(file, fileName, _storageOptions.MealImgPath);
            case FileSpecification.CategoryImg:
                return await ChangeFileAsync(file, fileName, _storageOptions.CategoryImgPath);
        }
        return false;
    }

    private async Task<bool> ChangeFileAsync(IFormFile File, string fileName, string storagePath)
    {
        var filePath = _storageOptions.FullPath + fileName;

#if DEBUG || TEST
        if (!Directory.Exists(storagePath))
            Directory.CreateDirectory(storagePath);
#endif

        try
        {
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await File.CopyToAsync(stream);
            }
        }
        catch { return false; }
        return true;
    }

    private async Task<string> UploadFilesAsync(IFormFile File, string storagePath)
    {
        var uploadFileName = Guid.NewGuid() + "." + File.ContentType.Split('/').Last();

        var filePath = storagePath + uploadFileName;
        var fileFullPath = _storageOptions.FullPath + filePath;

        try
        {
            if (!Directory.Exists(_storageOptions.FullPath + storagePath))
                Directory.CreateDirectory(_storageOptions.FullPath + storagePath);

            using (var stream = new FileStream(fileFullPath, FileMode.Create))
            {
                await File.CopyToAsync(stream);
            }
        }
        catch (Exception ex)
        {
            Debug.WriteLine($"Error uploading file: {ex.Message}");
            throw;
        }

        return filePath;
    }

    public bool DeleteFile(string deleteFilePath)
    {
        if (File.Exists(deleteFilePath))
        {
            File.Delete(deleteFilePath);
            return true;
        }
        return false;
    }
}
