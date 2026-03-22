namespace StockFlow.Infrastructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using StockFlow.Domain.Entities;
using StockFlow.Domain.Interfaces.Repositories;

public class SupplierRepository : ISupplierRepository
{
    private readonly StockFlowDbContext _context;

    public SupplierRepository(StockFlowDbContext context)
    {
        _context = context;
    }

    public async Task<Supplier?> GetByIdAsync(Guid id, CancellationToken ct = default)
        => await _context.Suppliers.FirstOrDefaultAsync(s => s.Id == id, ct);

    public async Task<IEnumerable<Supplier>> GetAllActiveAsync(CancellationToken ct = default)
        => await _context.Suppliers
            .Where(s => s.IsActive)
            .OrderBy(s => s.Name)
            .ToListAsync(ct);

    public async Task AddAsync(Supplier supplier, CancellationToken ct = default)
        => await _context.Suppliers.AddAsync(supplier, ct);

    public void Update(Supplier supplier)
        => _context.Suppliers.Update(supplier);
}