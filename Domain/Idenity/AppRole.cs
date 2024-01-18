using Microsoft.AspNetCore.Identity;

namespace Domain.Idenity;

public class AppRole : IdentityRole<long>
{
    public ICollection<AppUser> AppUsers { get; set; }
}
