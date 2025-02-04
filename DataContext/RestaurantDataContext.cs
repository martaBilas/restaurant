using DataContext.Configurations;
using Domain;
using Domain.Idenity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataContext;

public class RestaurantDataContext : IdentityDbContext<AppUser, AppRole, long>
{
    public DbSet<AppUser> Users { get; set; }
    public DbSet<AppRole> Roles { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Meal> Meals { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderRow> OrderRows { get; set; }
    public DbSet<MealCategory> MealCategories { get; set; }
    public RestaurantDataContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ApplyConfiguration(new AppUserConfiguration());
        builder.ApplyConfiguration(new AppRoleConfiguration());
        builder.ApplyConfiguration(new CustomerConfiguration());
        builder.ApplyConfiguration(new OrderConfiguration());
        builder.ApplyConfiguration(new MealConfiguration());
        builder.ApplyConfiguration(new MealCategoryConfiguration());

        //builder.Entity<AppUser>()
        //    .HasMany(e => e.UserRoles)
        //    .WithMany(e => e.AppUsers)
        //    .UsingEntity(
        //        "AspNetUserRoles",
        //        l => l.HasOne(typeof(AppRole)).WithMany().HasForeignKey("RoleId").HasPrincipalKey("Id"),
        //        r => r.HasOne(typeof(AppUser)).WithMany().HasForeignKey("UserId").HasPrincipalKey("Id"),
        //        j => j.HasKey("RoleId", "UserId"));

        //builder.Entity<AppRole>()
        //    .HasMany(e => e.AppUsers)
        //    .WithMany(e => e.UserRoles)
        //    .UsingEntity(
        //        "AspNetUserRoles",
        //        l => l.HasOne(typeof(AppRole)).WithMany().HasForeignKey("RoleId").HasPrincipalKey("Id"),
        //        r => r.HasOne(typeof(AppUser)).WithMany().HasForeignKey("UserId").HasPrincipalKey("Id"),
        //        j => j.HasKey("RoleId", "UserId"));
    }
}
