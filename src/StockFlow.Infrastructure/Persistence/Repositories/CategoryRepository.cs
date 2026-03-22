namespace StockFlow.Infrastructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using StockFlow.Domain.Entities;
using StockFlow.Domain.Interfaces.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly StockFlowDbContext _context;

    public CategoryRepository(StockFlowDbContext context)
    {
        _context = context;
    }

    public async Task<Category?> GetByIdAsync(Guid id, CancellationToken ct = default)
        => await _context.Categories.FirstOrDefaultAsync(c => c.Id == id, ct);

    public async Task<IEnumerable<Category>> GetAllActiveAsync(CancellationToken ct = default)
        => await _context.Categories
            .Where(c => c.IsActive)
            .OrderBy(c => c.Name)
            .ToListAsync(ct);

    public async Task AddAsync(Category category, CancellationToken ct = default)
        => await _context.Categories.AddAsync(category, ct);

    public void Update(Category category)
        => _context.Categories.Update(category);
}