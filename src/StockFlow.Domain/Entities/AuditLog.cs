namespace StockFlow.Domain.Entities;

public class AuditLog : BaseEntity
{
    public Guid? UserId { get; private set; }
    public string Action { get; private set; } = default!;
    public string Entity { get; private set; } = default!;
    public string EntityId { get; private set; } = default!;
    public string? OldValues { get; private set; }
    public string? NewValues { get; private set; }
    public string? IpAddress { get; private set; }

    public virtual User? User { get; private set; }

    protected AuditLog() { }

    public AuditLog(Guid? userId, string action, string entity, string entityId,
                    string? oldValues = null, string? newValues = null, string? ipAddress = null)
    {
        UserId = userId;
        Action = action;
        Entity = entity;
        EntityId = entityId;
        OldValues = oldValues;
        NewValues = newValues;
        IpAddress = ipAddress;
    }
}