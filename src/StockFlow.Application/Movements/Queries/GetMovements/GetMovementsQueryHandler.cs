namespace StockFlow.Application.Movements.Queries.GetMovements;
using AutoMapper;
using MediatR;
using StockFlow.Application.Common.DTOs;
using StockFlow.Domain.Interfaces.Repositories;

public class GetMovementsQueryHandler : IRequestHandler<GetMovementsQuery, IEnumerable<MovementDto>>
{
    private readonly IMovementRepository _repository;
    private readonly IMapper _mapper;

    public GetMovementsQueryHandler(IMovementRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<MovementDto>> Handle(GetMovementsQuery query, CancellationToken ct)
    {
        var movements = query.ProductId.HasValue
            ? await _repository.GetByProductIdAsync(query.ProductId.Value, ct)
            : await _repository.GetAllAsync(ct);

        return _mapper.Map<IEnumerable<MovementDto>>(movements);
    }
}