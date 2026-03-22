namespace StockFlow.Application.Categories.Commands.DeleteCategory;
using MediatR;

public record DeleteCategoryCommand(Guid Id) : IRequest;