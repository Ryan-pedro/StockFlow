namespace StockFlow.Domain.Entities;
using StockFlow.Domain.Enums;

public class User : BaseEntity
{
    public string Name { get; private set; } = default!;
    public string Email { get; private set; } = default!;
    public string PasswordHash { get; private set; } = default!;
    public UserRole Role { get; private set; } = UserRole.Operator;
    public bool IsActive { get; private set; } = true;
    public DateTime? LastLoginAt { get; private set; }

    protected User() { } // EF Core

    public User(string name, string email, string passwordHash,
                UserRole role = UserRole.Operator)
    {
        Name = name.Trim();
        Email = email.Trim().ToLowerInvariant();
        PasswordHash = passwordHash;
        Role = role;
    }

    public void RecordLogin() { LastLoginAt = DateTime.UtcNow; }
    public void UpdateHash(string hash) { PasswordHash = hash; SetUpdated(); }
    public void Deactivate() { IsActive = false; SetUpdated(); }
    public bool IsAdmin() => Role == UserRole.Admin;
}