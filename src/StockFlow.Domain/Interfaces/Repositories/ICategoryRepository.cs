namespace StockFlow.Domain.Interfaces.Repositories;
using StockFlow.Domain.Entities;

public interface ICategoryRepository
{
    Task<Category?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<IEnumerable<Category>> GetAllActiveAsync(CancellationToken ct = default);
    Task AddAsync(Category category, CancellationToken ct = default);
    void Update(Category category);
}