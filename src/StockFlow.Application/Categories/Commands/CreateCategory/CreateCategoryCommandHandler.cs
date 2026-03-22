namespace StockFlow.Application.Categories.Commands.CreateCategory;
using AutoMapper;
using MediatR;
using StockFlow.Application.Common.DTOs;
using StockFlow.Domain.Entities;
using StockFlow.Domain.Interfaces;
using StockFlow.Domain.Interfaces.Repositories;

public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, CategoryDto>
{
    private readonly ICategoryRepository _repository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CreateCategoryCommandHandler(ICategoryRepository repository,
        IUnitOfWork unitOfWork, IMapper mapper)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<CategoryDto> Handle(CreateCategoryCommand command, CancellationToken ct)
    {
        var category = new Category(command.Name, command.Description);

        await _repository.AddAsync(category, ct);
        await _unitOfWork.CommitAsync(ct);

        return _mapper.Map<CategoryDto>(category);
    }
}