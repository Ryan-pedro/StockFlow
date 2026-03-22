namespace StockFlow.Domain.Entities;

public class Category : BaseEntity
{
    private readonly List<Product> _products = [];

    public string Name { get; private set; } = default!;
    public string? Description { get; private set; }
    public bool IsActive { get; private set; } = true;

    public IReadOnlyCollection<Product> Products => _products.AsReadOnly();

    protected Category() { } // EF Core

    public Category(string name, string? description = null)
    {
        Name = name.Trim();
        Description = description?.Trim();
    }

    public void Update(string name, string? description)
    {
        Name = name.Trim();
        Description = description?.Trim();
        SetUpdated();
    }

    public void Deactivate() { IsActive = false; SetUpdated(); }
    public void Activate() { IsActive = true; SetUpdated(); }
}