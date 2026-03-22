namespace StockFlow.Domain.Interfaces.Repositories;
using StockFlow.Domain.Entities;

public interface IMovementRepository
{
    Task<Movement?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<IEnumerable<Movement>> GetByProductIdAsync(Guid productId, CancellationToken ct = default);
    Task<IEnumerable<Movement>> GetRecentAsync(int count, CancellationToken ct = default);
    Task<int> GetTodayCountAsync(CancellationToken ct = default);
    Task AddAsync(Movement movement, CancellationToken ct = default);
}