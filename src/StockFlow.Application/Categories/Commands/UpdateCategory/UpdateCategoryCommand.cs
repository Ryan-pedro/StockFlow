namespace StockFlow.Application.Categories.Commands.UpdateCategory;
using MediatR;
using StockFlow.Application.Common.DTOs;

public record UpdateCategoryCommand(
    Guid Id,
    string Name,
    string? Description) : IRequest<CategoryDto>;