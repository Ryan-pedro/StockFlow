namespace StockFlow.Application.Categories.Commands.DeleteCategory;
using MediatR;
using StockFlow.Domain.Entities;
using StockFlow.Domain.Exceptions;
using StockFlow.Domain.Interfaces;
using StockFlow.Domain.Interfaces.Repositories;
public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand>
{
    private readonly ICategoryRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteCategoryCommandHandler(ICategoryRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(DeleteCategoryCommand command, CancellationToken ct)
    {
        var category = await _repository.GetByIdAsync(command.Id, ct)
            ?? throw new NotFoundException(nameof(Category), command.Id);

        category.Deactivate();

        _repository.Update(category);
        await _unitOfWork.CommitAsync(ct);
    }
}