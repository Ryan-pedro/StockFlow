namespace StockFlow.Application.Suppliers.Queries.GetSuppliers;
using MediatR;
using StockFlow.Application.Common.DTOs;

public record GetSuppliersQuery : IRequest<IEnumerable<SupplierDto>>;