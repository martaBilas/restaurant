using Infrastructure.Models;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Interfaces;

public interface IUserService
{
    Task<IdentityResult> CreateUserAsync(string address, string email, string firstName, string lastName, string phoneNumber, string password, string roleName);
    Task<bool> LogOutAsync();
    Task<SignInResult> SignInAsync(string email, string password);
}
