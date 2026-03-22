namespace StockFlow.Application.Categories.Queries.GetCategories;
using MediatR;
using StockFlow.Application.Common.DTOs;

public record GetCategoriesQuery : IRequest<IEnumerable<CategoryDto>>;