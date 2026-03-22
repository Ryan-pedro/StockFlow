namespace StockFlow.Infrastructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using StockFlow.Domain.Entities;
using StockFlow.Domain.Interfaces.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly StockFlowDbContext _context;

    public ProductRepository(StockFlowDbContext context)
    {
        _context = context;
    }

    public async Task<Product?> GetByIdAsync(Guid id, CancellationToken ct = default)
        => await _context.Products
            .Include(p => p.Category)
            .Include(p => p.Supplier)
            .FirstOrDefaultAsync(p => p.Id == id, ct);

    public async Task<IEnumerable<Product>> GetAllAsync(CancellationToken ct = default)
        => await _context.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .Include(p => p.Supplier)
            .Where(p => p.IsActive)
            .OrderBy(p => p.Name)
            .ToListAsync(ct);

    public async Task<IEnumerable<Product>> GetLowStockAsync(CancellationToken ct = default)
        => await _context.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .Where(p => p.IsActive && p.StockQuantity <= p.MinimumStock)
            .OrderBy(p => p.StockQuantity)
            .ToListAsync(ct);

    public async Task AddAsync(Product product, CancellationToken ct = default)
        => await _context.Products.AddAsync(product, ct);

    public void Update(Product product)
        => _context.Products.Update(product);

    public void Remove(Product product)
        => _context.Products.Update(product); // soft delete
    public async Task<int> GetTotalStockItemsAsync(CancellationToken ct = default)
    => await _context.Products
        .Where(p => p.IsActive)
        .SumAsync(p => p.StockQuantity, ct);
}