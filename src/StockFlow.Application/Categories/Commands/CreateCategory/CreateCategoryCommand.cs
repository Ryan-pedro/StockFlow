namespace StockFlow.Application.Categories.Commands.CreateCategory;
using MediatR;
using StockFlow.Application.Common.DTOs;

public record CreateCategoryCommand(
    string Name,
    string? Description) : IRequest<CategoryDto>;