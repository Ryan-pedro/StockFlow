namespace StockFlow.Application.Products.Commands.DeleteProduct;
using MediatR;
using StockFlow.Domain.Entities;
using StockFlow.Domain.Exceptions;
using StockFlow.Domain.Interfaces;
using StockFlow.Domain.Interfaces.Repositories;

public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand>
{
    private readonly IProductRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteProductCommandHandler(IProductRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(DeleteProductCommand command, CancellationToken ct)
    {
        var product = await _repository.GetByIdAsync(command.Id, ct)
            ?? throw new NotFoundException(nameof(Product), command.Id);

        product.Deactivate();

        _repository.Update(product);
        await _unitOfWork.CommitAsync(ct);
    }
}