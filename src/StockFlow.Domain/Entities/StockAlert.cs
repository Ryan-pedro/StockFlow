namespace StockFlow.Domain.Entities;

public class StockAlert : BaseEntity
{
    public Guid ProductId { get; private set; }
    public int StockAtAlert { get; private set; }
    public int MinimumStock { get; private set; }
    public bool IsRead { get; private set; }
    public DateTime? ReadAt { get; private set; }

    public virtual Product Product { get; private set; } = default!;

    protected StockAlert() { } // EF Core

    public StockAlert(Guid productId, int stockAtAlert, int minimumStock)
    {
        ProductId = productId;
        StockAtAlert = stockAtAlert;
        MinimumStock = minimumStock;
        IsRead = false;
    }

    public void MarkAsRead()
    {
        IsRead = true;
        ReadAt = DateTime.UtcNow;
        SetUpdated();
    }
}
