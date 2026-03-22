namespace StockFlow.Application.Categories.Queries.GetCategoryById;
using MediatR;
using StockFlow.Application.Common.DTOs;

public record GetCategoryByIdQuery(Guid Id) : IRequest<CategoryDto>;