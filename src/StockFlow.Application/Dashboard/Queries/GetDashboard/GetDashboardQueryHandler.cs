namespace StockFlow.Application.Dashboard.Queries.GetDashboard;
using MediatR;
using StockFlow.Domain.Interfaces.Repositories;

public class GetDashboardQueryHandler : IRequestHandler<GetDashboardQuery, DashboardDto>
{
    private readonly IProductRepository _productRepository;
    private readonly IMovementRepository _movementRepository;

    public GetDashboardQueryHandler(IProductRepository productRepository,
        IMovementRepository movementRepository)
    {
        _productRepository = productRepository;
        _movementRepository = movementRepository;
    }

    public async Task<DashboardDto> Handle(GetDashboardQuery query, CancellationToken ct)
    {
        var lowStockProducts = await _productRepository.GetLowStockAsync(ct);
        var totalStockItems = await _productRepository.GetTotalStockItemsAsync(ct);
        var recentMovements = await _movementRepository.GetRecentAsync(10, ct);
        var movementsToday = await _movementRepository.GetTodayCountAsync(ct);
        var allProducts = await _productRepository.GetAllAsync(ct);

        return new DashboardDto
        {
            TotalProducts = allProducts.Count(),
            TotalStockItems = totalStockItems,
            LowStockCount = lowStockProducts.Count(),
            MovementsToday = movementsToday,
            LowStockProducts = lowStockProducts.Select(p => new LowStockProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Code = p.Code,
                StockQuantity = p.StockQuantity,
                MinimumStock = p.MinimumStock,
                CategoryName = p.Category.Name
            }),
            RecentMovements = recentMovements.Select(m => new RecentMovementDto
            {
                Id = m.Id,
                ProductName = m.Product.Name,
                Type = m.Type.ToString(),
                Quantity = m.Quantity,
                TotalValue = m.TotalValue,
                MovementDate = m.MovementDate,
                UserName = m.User.Name
            })
        };
    }
}