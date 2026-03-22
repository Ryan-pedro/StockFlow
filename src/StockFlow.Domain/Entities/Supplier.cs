namespace StockFlow.Domain.Entities;

public class Supplier : BaseEntity
{
    private readonly List<Product> _products = [];

    public string Name { get; private set; } = default!;
    public string? CNPJ { get; private set; }
    public string? Email { get; private set; }
    public string? Phone { get; private set; }
    public string? Address { get; private set; }
    public bool IsActive { get; private set; } = true;

    public IReadOnlyCollection<Product> Products => _products.AsReadOnly();

    protected Supplier() { } // EF Core

    public Supplier(string name, string? cnpj, string? email,
                    string? phone, string? address = null)
    {
        Name = name.Trim();
        CNPJ = cnpj?.Trim();
        Email = email?.Trim();
        Phone = phone?.Trim();
        Address = address?.Trim();
    }

    public void Update(string name, string? cnpj, string? email,
                       string? phone, string? address)
    {
        Name = name.Trim();
        CNPJ = cnpj?.Trim();
        Email = email?.Trim();
        Phone = phone?.Trim();
        Address = address?.Trim();
        SetUpdated();
    }

    public void Deactivate() { IsActive = false; SetUpdated(); }
}