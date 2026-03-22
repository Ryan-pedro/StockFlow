namespace StockFlow.Application.Movements.Queries.GetMovements;
using MediatR;
using StockFlow.Application.Common.DTOs;

public record GetMovementsQuery(Guid? ProductId = null) : IRequest<IEnumerable<MovementDto>>;