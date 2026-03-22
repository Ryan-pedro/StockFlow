namespace StockFlow.Application.Products.Queries.GetProducts;
using AutoMapper;
using MediatR;
using StockFlow.Application.Common.DTOs;
using StockFlow.Domain.Interfaces.Repositories;

public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, IEnumerable<ProductDto>>
{
    private readonly IProductRepository _repository;
    private readonly IMapper _mapper;

    public GetProductsQueryHandler(IProductRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ProductDto>> Handle(GetProductsQuery query, CancellationToken ct)
    {
        var products = await _repository.GetAllAsync(ct);
        return _mapper.Map<IEnumerable<ProductDto>>(products);
    }
}