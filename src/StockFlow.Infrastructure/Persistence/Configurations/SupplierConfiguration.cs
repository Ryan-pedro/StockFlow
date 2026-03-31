namespace StockFlow.Infrastructure.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockFlow.Domain.Entities;

public class SupplierConfiguration : IEntityTypeConfiguration<Supplier>
{
    public void Configure(EntityTypeBuilder<Supplier> builder)
    {
        builder.ToTable("Suppliers");
        builder.HasKey(s => s.Id);
        builder.Property(s => s.Id).HasDefaultValueSql("gen_random_uuid()");
        builder.Property(s => s.Name).IsRequired().HasMaxLength(200);
        builder.Property(s => s.CNPJ).HasMaxLength(18);
        builder.Property(s => s.Email).HasMaxLength(254);
        builder.Property(s => s.Phone).HasMaxLength(20);
        builder.Property(s => s.Address).HasMaxLength(500);
        builder.Property(s => s.IsActive).HasDefaultValue(true);
        builder.Property(s => s.CreatedAt).HasDefaultValueSql("now()");
        builder.HasIndex(s => s.CNPJ)
               .IsUnique()
               .HasFilter("\"CNPJ\" IS NOT NULL")
               .HasDatabaseName("UQ_Suppliers_CNPJ");
        builder.HasMany(s => s.Products)
               .WithOne(p => p.Supplier)
               .HasForeignKey(p => p.SupplierId)
               .OnDelete(DeleteBehavior.SetNull)
               .HasConstraintName("FK_Products_Supplier");
    }
}