namespace StockFlow.Application.Suppliers.Queries.GetSuppliers;
using AutoMapper;
using MediatR;
using StockFlow.Application.Common.DTOs;
using StockFlow.Domain.Interfaces.Repositories;

public class GetSuppliersQueryHandler : IRequestHandler<GetSuppliersQuery, IEnumerable<SupplierDto>>
{
    private readonly ISupplierRepository _repository;
    private readonly IMapper _mapper;

    public GetSuppliersQueryHandler(ISupplierRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<SupplierDto>> Handle(GetSuppliersQuery query, CancellationToken ct)
    {
        var suppliers = await _repository.GetAllActiveAsync(ct);
        return _mapper.Map<IEnumerable<SupplierDto>>(suppliers);
    }
}