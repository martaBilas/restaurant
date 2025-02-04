using Domain.Idenity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace DataContext.Configurations;

public class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
{
    public void Configure(EntityTypeBuilder<AppUser> builder)
    {
        builder.ToTable("AppUsers", "dbo");
        builder.Property(u => u.UserName).HasMaxLength(128);
        builder.Property(u => u.NormalizedUserName).HasMaxLength(128);
        builder.Property(u => u.Email).HasMaxLength(128);
        builder.Property(u => u.NormalizedEmail).HasMaxLength(128);
    }
}
