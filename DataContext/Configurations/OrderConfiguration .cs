using Domain;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace DataContext.Configurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.HasKey(x => x.Id);
        builder.HasMany(p => p.OrderRows).WithOne();
        builder.HasOne(p => p.Customer);
        builder.Property(p => p.AdditionalInfo).HasColumnType("nvarchar(2048)");
    }
}
