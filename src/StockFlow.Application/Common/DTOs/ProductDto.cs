namespace StockFlow.Application.Common.DTOs;

public class ProductDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public string Code { get; set; } = default!;
    public decimal UnitPrice { get; set; }
    public int StockQuantity { get; set; }
    public int MinimumStock { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; }
    public bool IsLowStock { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public Guid CategoryId { get; set; }
    public string CategoryName { get; set; } = default!;
    public Guid? SupplierId { get; set; }
    public string? SupplierName { get; set; }
}