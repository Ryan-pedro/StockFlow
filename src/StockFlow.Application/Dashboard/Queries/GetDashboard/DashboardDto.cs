namespace StockFlow.Application.Dashboard.Queries.GetDashboard;

public class DashboardDto
{
    public int TotalProducts { get; set; }
    public int TotalStockItems { get; set; }
    public int LowStockCount { get; set; }
    public int MovementsToday { get; set; }
    public IEnumerable<LowStockProductDto> LowStockProducts { get; set; } = [];
    public IEnumerable<RecentMovementDto> RecentMovements { get; set; } = [];
}

public class LowStockProductDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public string Code { get; set; } = default!;
    public int StockQuantity { get; set; }
    public int MinimumStock { get; set; }
    public string CategoryName { get; set; } = default!;
}

public class RecentMovementDto
{
    public Guid Id { get; set; }
    public string ProductName { get; set; } = default!;
    public string Type { get; set; } = default!;
    public int Quantity { get; set; }
    public decimal TotalValue { get; set; }
    public DateTime MovementDate { get; set; }
    public string UserName { get; set; } = default!;
}