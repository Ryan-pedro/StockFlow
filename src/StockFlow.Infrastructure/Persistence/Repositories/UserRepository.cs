namespace StockFlow.Infrastructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using StockFlow.Domain.Entities;
using StockFlow.Domain.Interfaces.Repositories;

public class UserRepository : IUserRepository
{
    private readonly StockFlowDbContext _context;

    public UserRepository(StockFlowDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByIdAsync(Guid id, CancellationToken ct = default)
        => await _context.Users.FirstOrDefaultAsync(u => u.Id == id, ct);

    public async Task<User?> GetByEmailAsync(string email, CancellationToken ct = default)
        => await _context.Users.FirstOrDefaultAsync(u => u.Email == email.ToLowerInvariant(), ct);

    public async Task AddAsync(User user, CancellationToken ct = default)
        => await _context.Users.AddAsync(user, ct);

    public void Update(User user)
        => _context.Users.Update(user);
}