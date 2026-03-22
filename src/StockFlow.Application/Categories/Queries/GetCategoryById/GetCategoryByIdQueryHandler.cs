namespace StockFlow.Application.Categories.Queries.GetCategoryById;
using AutoMapper;
using MediatR;
using StockFlow.Application.Common.DTOs;
using StockFlow.Domain.Entities;
using StockFlow.Domain.Exceptions;
using StockFlow.Domain.Interfaces.Repositories;

public class GetCategoryByIdQueryHandler : IRequestHandler<GetCategoryByIdQuery, CategoryDto>
{
    private readonly ICategoryRepository _repository;
    private readonly IMapper _mapper;

    public GetCategoryByIdQueryHandler(ICategoryRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<CategoryDto> Handle(GetCategoryByIdQuery query, CancellationToken ct)
    {
        var category = await _repository.GetByIdAsync(query.Id, ct)
            ?? throw new NotFoundException(nameof(Category), query.Id);

        return _mapper.Map<CategoryDto>(category);
    }
}