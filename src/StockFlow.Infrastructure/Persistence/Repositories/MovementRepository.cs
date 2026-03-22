namespace StockFlow.Infrastructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using StockFlow.Domain.Entities;
using StockFlow.Domain.Interfaces.Repositories;

public class MovementRepository : IMovementRepository
{
    private readonly StockFlowDbContext _context;

    public MovementRepository(StockFlowDbContext context)
    {
        _context = context;
    }

    public async Task<Movement?> GetByIdAsync(Guid id, CancellationToken ct = default)
        => await _context.Movements
            .Include(m => m.Product)
            .Include(m => m.User)
            .FirstOrDefaultAsync(m => m.Id == id, ct);

    public async Task<IEnumerable<Movement>> GetByProductIdAsync(Guid productId, CancellationToken ct = default)
        => await _context.Movements
            .AsNoTracking()
            .Include(m => m.User)
            .Where(m => m.ProductId == productId)
            .OrderByDescending(m => m.MovementDate)
            .ToListAsync(ct);

    public async Task AddAsync(Movement movement, CancellationToken ct = default)
        => await _context.Movements.AddAsync(movement, ct);
}