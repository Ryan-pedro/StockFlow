namespace StockFlow.Application.Common.DTOs;

public class MovementDto
{
    public Guid Id { get; set; }
    public string Type { get; set; } = default!;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalValue { get; set; }
    public string? Notes { get; set; }
    public DateTime MovementDate { get; set; }
    public Guid ProductId { get; set; }
    public string ProductName { get; set; } = default!;
    public string ProductCode { get; set; } = default!;
    public Guid UserId { get; set; }
    public string UserName { get; set; } = default!;
}