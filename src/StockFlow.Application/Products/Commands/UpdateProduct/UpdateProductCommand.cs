namespace StockFlow.Application.Products.Commands.UpdateProduct;
using MediatR;
using StockFlow.Application.Common.DTOs;

public record UpdateProductCommand(
    Guid Id,
    string Name,
    Guid CategoryId,
    Guid? SupplierId,
    decimal UnitPrice,
    int MinimumStock,
    string? Description) : IRequest<ProductDto>;