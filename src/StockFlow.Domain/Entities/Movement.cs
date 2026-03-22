namespace StockFlow.Domain.Entities;
using StockFlow.Domain.Enums;

public class Movement : BaseEntity
{
    public Guid ProductId { get; private set; }
    public Guid UserId { get; private set; }
    public MovementType Type { get; private set; }
    public int Quantity { get; private set; }
    public decimal UnitPrice { get; private set; }
    public decimal TotalValue { get; private set; }
    public string? Notes { get; private set; }
    public DateTime MovementDate { get; private set; }

    public virtual Product Product { get; private set; } = default!;
    public virtual User User { get; private set; } = default!;

    protected Movement() { } // EF Core

    public Movement(Guid productId, Guid userId, MovementType type,
                    int quantity, decimal unitPrice, string? notes = null)
    {
        ProductId = productId;
        UserId = userId;
        Type = type;
        Quantity = quantity;
        UnitPrice = unitPrice;
        TotalValue = quantity * unitPrice;
        Notes = notes?.Trim();
        MovementDate = DateTime.UtcNow;
    }
}