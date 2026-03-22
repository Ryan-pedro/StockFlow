namespace StockFlow.Application.Categories.Queries.GetCategories;
using AutoMapper;
using MediatR;
using StockFlow.Application.Common.DTOs;
using StockFlow.Domain.Interfaces.Repositories;

public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, IEnumerable<CategoryDto>>
{
    private readonly ICategoryRepository _repository;
    private readonly IMapper _mapper;

    public GetCategoriesQueryHandler(ICategoryRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<CategoryDto>> Handle(GetCategoriesQuery query, CancellationToken ct)
    {
        var categories = await _repository.GetAllActiveAsync(ct);
        return _mapper.Map<IEnumerable<CategoryDto>>(categories);
    }
}