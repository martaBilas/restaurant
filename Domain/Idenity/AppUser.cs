using Microsoft.AspNetCore.Identity;

namespace Domain.Idenity;

public class AppUser : IdentityUser<long>
{
    public ICollection<AppRole> AppRoles { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}
