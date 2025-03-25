using Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces.Services;

public interface IFileStorageService
{
	Task<string> UploadFileAsync(IFormFile file, FileSpecification fileSpecification);
	bool DeleteFile(string deleteFilePath);
	Task<bool> ChangeFile(IFormFile file, string fileName, FileSpecification fileSpecification);
}
