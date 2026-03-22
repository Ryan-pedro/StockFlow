namespace StockFlow.Application.Dashboard.Queries.GetDashboard;
using MediatR;

public record GetDashboardQuery : IRequest<DashboardDto>;