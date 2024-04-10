using Domain.Idenity;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<AppRole> _roleManager;

        public UserService(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, RoleManager<AppRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }
        public async Task<IdentityResult> CreateUserAsync(string address, string email, string firstName, string lastName, string phoneNumber, string password, string roleName)
        {
            var existingUser = await _userManager.FindByEmailAsync(email);
            if (existingUser != null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "There is user with such email." });
            }
            var user = new AppUser
            {
                Address = address,
                Email = email,
                FirstName = firstName,
                LastName = lastName,
                PhoneNumber = phoneNumber,
                EmailConfirmed = true,
                UserName = email,
            };
            var result = await _userManager.CreateAsync(user, password);
            if (result.Succeeded)
            {
                var roleExists = await _roleManager.RoleExistsAsync(roleName);
                if (roleExists)
                {
                    await _userManager.AddToRoleAsync(user, roleName);
                }
            }
            return result;
        }

        public async Task<SignInResult> SignInAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return SignInResult.Failed;
            }

            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                return SignInResult.NotAllowed;
            }
            var rememberMe = true;

            var result = await _signInManager.PasswordSignInAsync(user, password, rememberMe, lockoutOnFailure: false);
            if (result.Succeeded)
                return result;
            else
                return SignInResult.Failed;
        }

        public async Task<bool> LogOutAsync()
        {
            try
            {
                await _signInManager.SignOutAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<IdentityResult> DeleteUserAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = $"User with email {email} does not exist." });
            }

            var result = await _userManager.DeleteAsync(user);
            return result;
        }
        public async Task<IdentityResult> UpdateUserAsync(string email, string newEmail = null, string newPhoneNumber = null)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = $"User with email {email} does not exist." });
            }

            if (!string.IsNullOrEmpty(newEmail))
            {
                user.Email = newEmail;
            }

            if (!string.IsNullOrEmpty(newPhoneNumber))
            {
                user.PhoneNumber = newPhoneNumber;
            }

            var result = await _userManager.UpdateAsync(user);
            return result;
        }

    }
}
