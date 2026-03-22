namespace StockFlow.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using StockFlow.Domain.Entities;

public class StockFlowDbContext : DbContext
{
    public StockFlowDbContext(DbContextOptions<StockFlowDbContext> options)
        : base(options) { }

    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Movement> Movements { get; set; }
    public DbSet<StockAlert> StockAlerts { get; set; }
    public DbSet<AuditLog> AuditLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(StockFlowDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}