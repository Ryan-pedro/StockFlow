namespace StockFlow.Application.Movements.Commands.RegisterMovement;
using MediatR;
using StockFlow.Application.Common.DTOs;

public record RegisterMovementCommand(
    Guid ProductId,
    Guid UserId,
    string Type,
    int Quantity,
    decimal UnitPrice,
    string? Notes) : IRequest<MovementDto>;