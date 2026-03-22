namespace StockFlow.Application.Products.Commands.DeleteProduct;
using MediatR;

public record DeleteProductCommand(Guid Id) : IRequest;