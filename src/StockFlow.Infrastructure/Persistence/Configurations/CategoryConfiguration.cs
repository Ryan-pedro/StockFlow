namespace StockFlow.Infrastructure.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockFlow.Domain.Entities;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.ToTable("Categories");
        builder.HasKey(c => c.Id);

        builder.Property(c => c.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
        builder.Property(c => c.Name).IsRequired().HasMaxLength(100);
        builder.Property(c => c.Description).HasMaxLength(500);
        builder.Property(c => c.IsActive).HasDefaultValue(true);
        builder.Property(c => c.CreatedAt).HasDefaultValueSql("GETUTCDATE()");

        builder.HasIndex(c => c.Name)
               .IsUnique()
               .HasDatabaseName("UQ_Categories_Name");

        builder.HasMany(c => c.Products)
               .WithOne(p => p.Category)
               .HasForeignKey(p => p.CategoryId)
               .OnDelete(DeleteBehavior.Restrict)
               .HasConstraintName("FK_Products_Category");
    }
}