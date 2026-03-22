namespace StockFlow.Domain.Interfaces.Repositories;
using StockFlow.Domain.Entities;

public interface ISupplierRepository
{
    Task<Supplier?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<IEnumerable<Supplier>> GetAllActiveAsync(CancellationToken ct = default);
    Task AddAsync(Supplier supplier, CancellationToken ct = default);
    void Update(Supplier supplier);
}