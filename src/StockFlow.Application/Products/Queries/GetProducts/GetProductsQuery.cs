namespace StockFlow.Application.Products.Queries.GetProducts;
using MediatR;
using StockFlow.Application.Common.DTOs;

public record GetProductsQuery : IRequest<IEnumerable<ProductDto>>;