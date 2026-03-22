namespace StockFlow.Domain.Interfaces.Repositories;
using StockFlow.Domain.Entities;

public interface IProductRepository
{
    Task<Product?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<IEnumerable<Product>> GetAllAsync(CancellationToken ct = default);
    Task<IEnumerable<Product>> GetLowStockAsync(CancellationToken ct = default);
    Task AddAsync(Product product, CancellationToken ct = default);
    void Update(Product product);
    void Remove(Product product);
}