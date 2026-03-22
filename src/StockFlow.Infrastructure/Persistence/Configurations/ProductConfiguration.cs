namespace StockFlow.Infrastructure.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockFlow.Domain.Entities;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Products");
        builder.HasKey(p => p.Id);

        builder.Property(p => p.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
        builder.Property(p => p.Name).IsRequired().HasMaxLength(200);
        builder.Property(p => p.Code).IsRequired().HasMaxLength(50);
        builder.Property(p => p.UnitPrice).HasColumnType("decimal(18,2)").HasDefaultValue(0m);
        builder.Property(p => p.StockQuantity).HasDefaultValue(0);
        builder.Property(p => p.MinimumStock).HasDefaultValue(0);
        builder.Property(p => p.Description).HasMaxLength(1000);
        builder.Property(p => p.IsActive).HasDefaultValue(true);
        builder.Property(p => p.CreatedAt).HasDefaultValueSql("GETUTCDATE()");

        builder.HasIndex(p => p.Code)
               .IsUnique()
               .HasDatabaseName("UQ_Products_Code");

        builder.HasIndex(p => new { p.IsActive, p.Name })
               .HasDatabaseName("IX_Products_IsActive_Name");

        builder.HasIndex(p => new { p.StockQuantity, p.MinimumStock })
               .HasFilter("[IsActive] = 1")
               .HasDatabaseName("IX_Products_LowStock");
    }
}