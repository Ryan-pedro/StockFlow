namespace StockFlow.Infrastructure.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockFlow.Domain.Entities;

public class AuditLogConfiguration : IEntityTypeConfiguration<AuditLog>
{
    public void Configure(EntityTypeBuilder<AuditLog> builder)
    {
        builder.ToTable("AuditLogs");
        builder.HasKey(a => a.Id);

        builder.Property(a => a.Action).IsRequired().HasMaxLength(50);
        builder.Property(a => a.Entity).IsRequired().HasMaxLength(100);
        builder.Property(a => a.EntityId).IsRequired().HasMaxLength(50);
        builder.Property(a => a.OldValues).HasColumnType("NVARCHAR(MAX)");
        builder.Property(a => a.NewValues).HasColumnType("NVARCHAR(MAX)");
        builder.Property(a => a.IpAddress).HasMaxLength(45);
        builder.Property(a => a.CreatedAt).HasDefaultValueSql("GETUTCDATE()");

        builder.HasOne(a => a.User)
               .WithMany()
               .HasForeignKey(a => a.UserId)
               .OnDelete(DeleteBehavior.SetNull)
               .HasConstraintName("FK_AuditLogs_User");

        builder.HasIndex(a => new { a.Entity, a.EntityId })
               .HasDatabaseName("IX_AuditLogs_Entity_EntityId");
    }
}