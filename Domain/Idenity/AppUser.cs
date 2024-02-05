using Microsoft.AspNetCore.Identity;

namespace Domain.Idenity;

public class AppUser : IdentityUser<long>
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public ICollection<AppRole> UserRoles { get; set; }
}
