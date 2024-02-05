using Domain.Idenity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Services
{
    public class TestService
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
    }
}
