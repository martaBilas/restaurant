using Domain;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace DataContext.Configurations;

public class MealCategoryConfiguration : IEntityTypeConfiguration<MealCategory>
{
    public void Configure(EntityTypeBuilder<MealCategory> builder)
    {
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Name).IsRequired().HasMaxLength(255);
    }
}
