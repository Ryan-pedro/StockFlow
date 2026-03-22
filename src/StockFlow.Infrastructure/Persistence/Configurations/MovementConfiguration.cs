namespace StockFlow.Infrastructure.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockFlow.Domain.Entities;
using StockFlow.Domain.Enums;

public class MovementConfiguration : IEntityTypeConfiguration<Movement>
{
    public void Configure(EntityTypeBuilder<Movement> builder)
    {
        builder.ToTable("Movements");
        builder.HasKey(m => m.Id);

        builder.Property(m => m.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
        builder.Property(m => m.Quantity).IsRequired();
        builder.Property(m => m.UnitPrice).HasColumnType("decimal(18,2)");
        builder.Property(m => m.TotalValue)
               .HasColumnType("decimal(18,2)")
               .HasComputedColumnSql("[Quantity] * [UnitPrice]", stored: true);
        builder.Property(m => m.Notes).HasMaxLength(500);
        builder.Property(m => m.MovementDate).HasDefaultValueSql("GETUTCDATE()");
        builder.Property(m => m.CreatedAt).HasDefaultValueSql("GETUTCDATE()");

        builder.Property(m => m.Type)
               .HasMaxLength(10)
               .HasConversion(
                   t => t.ToString(),
                   v => Enum.Parse<MovementType>(v));

        builder.HasOne(m => m.Product)
               .WithMany(p => p.Movements)
               .HasForeignKey(m => m.ProductId)
               .OnDelete(DeleteBehavior.Restrict)
               .HasConstraintName("FK_Movements_Product");

        builder.HasOne(m => m.User)
               .WithMany()
               .HasForeignKey(m => m.UserId)
               .OnDelete(DeleteBehavior.Restrict)
               .HasConstraintName("FK_Movements_User");

        builder.HasIndex(m => new { m.ProductId, m.MovementDate })
               .HasDatabaseName("IX_Movements_ProductId_Date");
    }
}