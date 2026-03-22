namespace StockFlow.Application.Suppliers.Commands.UpdateSupplier;
using AutoMapper;
using MediatR;
using StockFlow.Application.Common.DTOs;
using StockFlow.Domain.Entities;
using StockFlow.Domain.Exceptions;
using StockFlow.Domain.Interfaces;
using StockFlow.Domain.Interfaces.Repositories;

public class UpdateSupplierCommandHandler : IRequestHandler<UpdateSupplierCommand, SupplierDto>
{
    private readonly ISupplierRepository _repository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public UpdateSupplierCommandHandler(ISupplierRepository repository,
        IUnitOfWork unitOfWork, IMapper mapper)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<SupplierDto> Handle(UpdateSupplierCommand command, CancellationToken ct)
    {
        var supplier = await _repository.GetByIdAsync(command.Id, ct)
            ?? throw new NotFoundException(nameof(Supplier), command.Id);

        supplier.Update(command.Name, command.CNPJ, command.Email,
            command.Phone, command.Address);

        _repository.Update(supplier);
        await _unitOfWork.CommitAsync(ct);

        return _mapper.Map<SupplierDto>(supplier);
    }
}