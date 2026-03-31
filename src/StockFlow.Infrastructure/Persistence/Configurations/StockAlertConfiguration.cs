namespace StockFlow.Infrastructure.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockFlow.Domain.Entities;

public class StockAlertConfiguration : IEntityTypeConfiguration<StockAlert>
{
    public void Configure(EntityTypeBuilder<StockAlert> builder)
    {
        builder.ToTable("StockAlerts");
        builder.HasKey(a => a.Id);
        builder.Property(a => a.IsRead).HasDefaultValue(false);
        builder.Property(a => a.CreatedAt).HasDefaultValueSql("now()");
        builder.HasOne(a => a.Product)
               .WithMany(p => p.Alerts)
               .HasForeignKey(a => a.ProductId)
               .OnDelete(DeleteBehavior.Cascade)
               .HasConstraintName("FK_StockAlerts_Product");
        builder.HasIndex(a => new { a.ProductId, a.IsRead })
               .HasDatabaseName("IX_StockAlerts_ProductId_IsRead");
    }
}