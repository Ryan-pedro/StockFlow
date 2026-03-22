namespace StockFlow.Application.Suppliers.Commands.DeleteSupplier;
using MediatR;
using StockFlow.Domain.Entities;
using StockFlow.Domain.Exceptions;
using StockFlow.Domain.Interfaces;
using StockFlow.Domain.Interfaces.Repositories;

public class DeleteSupplierCommandHandler : IRequestHandler<DeleteSupplierCommand>
{
    private readonly ISupplierRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteSupplierCommandHandler(ISupplierRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(DeleteSupplierCommand command, CancellationToken ct)
    {
        var supplier = await _repository.GetByIdAsync(command.Id, ct)
            ?? throw new NotFoundException(nameof(Supplier), command.Id);

        supplier.Deactivate();

        _repository.Update(supplier);
        await _unitOfWork.CommitAsync(ct);
    }
}