namespace StockFlow.Application.Products.Queries.GetProductById;
using MediatR;
using StockFlow.Application.Common.DTOs;

public record GetProductByIdQuery(Guid Id) : IRequest<ProductDto>;