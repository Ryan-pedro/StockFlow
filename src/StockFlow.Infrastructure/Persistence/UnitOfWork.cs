namespace StockFlow.Infrastructure.Persistence;
using StockFlow.Domain.Interfaces;

public class UnitOfWork : IUnitOfWork
{
    private readonly StockFlowDbContext _context;

    public UnitOfWork(StockFlowDbContext context)
    {
        _context = context;
    }

    public Task<int> CommitAsync(CancellationToken ct = default)
        => _context.SaveChangesAsync(ct);

    public void Dispose() => _context.Dispose();
}