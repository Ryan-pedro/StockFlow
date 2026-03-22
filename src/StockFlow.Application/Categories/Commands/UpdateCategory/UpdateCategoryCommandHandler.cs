namespace StockFlow.Application.Categories.Commands.UpdateCategory;
using AutoMapper;
using MediatR;
using StockFlow.Application.Common.DTOs;
using StockFlow.Domain.Entities;
using StockFlow.Domain.Exceptions;
using StockFlow.Domain.Interfaces;
using StockFlow.Domain.Interfaces.Repositories;

public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, CategoryDto>
{
    private readonly ICategoryRepository _repository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public UpdateCategoryCommandHandler(ICategoryRepository repository,
        IUnitOfWork unitOfWork, IMapper mapper)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<CategoryDto> Handle(UpdateCategoryCommand command, CancellationToken ct)
    {
        var category = await _repository.GetByIdAsync(command.Id, ct)
            ?? throw new NotFoundException(nameof(Category), command.Id);

        category.Update(command.Name, command.Description);

        _repository.Update(category);
        await _unitOfWork.CommitAsync(ct);

        return _mapper.Map<CategoryDto>(category);
    }
}