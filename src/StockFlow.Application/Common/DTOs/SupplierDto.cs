namespace StockFlow.Application.Common.DTOs;

public class SupplierDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public string? CNPJ { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}