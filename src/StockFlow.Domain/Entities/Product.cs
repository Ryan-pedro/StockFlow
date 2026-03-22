namespace StockFlow.Domain.Entities;
using StockFlow.Domain.Enums;
using StockFlow.Domain.Exceptions;

public class Product : BaseEntity
{
    private readonly List<Movement> _movements = [];
    private readonly List<StockAlert> _alerts = [];

    public string Name { get; private set; } = default!;
    public string Code { get; private set; } = default!;
    public Guid CategoryId { get; private set; }
    public Guid? SupplierId { get; private set; }
    public decimal UnitPrice { get; private set; }
    public int StockQuantity { get; private set; }
    public int MinimumStock { get; private set; }
    public string? Description { get; private set; }
    public bool IsActive { get; private set; } = true;

    public virtual Category Category { get; private set; } = default!;
    public virtual Supplier? Supplier { get; private set; }
    public IReadOnlyCollection<Movement> Movements => _movements.AsReadOnly();
    public IReadOnlyCollection<StockAlert> Alerts => _alerts.AsReadOnly();

    protected Product() { } // EF Core

    public Product(string name, string code, Guid categoryId, Guid? supplierId,
                   decimal unitPrice, int minimumStock, string? description = null)
    {
        if (unitPrice < 0) throw new DomainException(DomainErrors.Product.InvalidPrice());
        if (minimumStock < 0) throw new DomainException(DomainErrors.Product.InvalidMinimumStock());

        Name = name.Trim();
        Code = code.Trim().ToUpperInvariant();
        CategoryId = categoryId;
        SupplierId = supplierId;
        UnitPrice = unitPrice;
        MinimumStock = minimumStock;
        Description = description?.Trim();
        StockQuantity = 0;
    }

    public void ApplyMovement(MovementType type, int quantity)
    {
        if (quantity <= 0)
            throw new DomainException(DomainErrors.Product.InvalidQuantity());

        if (type == MovementType.Exit && StockQuantity < quantity)
            throw new InsufficientStockException(Id, StockQuantity, quantity);

        StockQuantity = type == MovementType.Entry
            ? StockQuantity + quantity
            : StockQuantity - quantity;

        SetUpdated();
    }

    public bool IsLowStock() => StockQuantity <= MinimumStock;
    public bool IsCritical() => StockQuantity == 0;

    public void Update(string name, Guid categoryId, Guid? supplierId,
                       decimal unitPrice, int minimumStock, string? description)
    {
        if (unitPrice < 0) throw new DomainException("Unit price cannot be negative.");
        if (minimumStock < 0) throw new DomainException("Minimum stock cannot be negative.");

        Name = name.Trim();
        CategoryId = categoryId;
        SupplierId = supplierId;
        UnitPrice = unitPrice;
        MinimumStock = minimumStock;
        Description = description?.Trim();
        SetUpdated();
    }

    public void Deactivate() { IsActive = false; SetUpdated(); }
}