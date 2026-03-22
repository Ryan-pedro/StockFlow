namespace StockFlow.Application.Products.Commands.CreateProduct;
using MediatR;
using StockFlow.Application.Common.DTOs;

public record CreateProductCommand(
    string Name,
    string Code,
    Guid CategoryId,
    Guid? SupplierId,
    decimal UnitPrice,
    int MinimumStock,
    string? Description) : IRequest<ProductDto>;