namespace StockFlow.Application.Suppliers.Commands.CreateSupplier;
using AutoMapper;
using MediatR;
using StockFlow.Application.Common.DTOs;
using StockFlow.Domain.Entities;
using StockFlow.Domain.Interfaces;
using StockFlow.Domain.Interfaces.Repositories;

public class CreateSupplierCommandHandler : IRequestHandler<CreateSupplierCommand, SupplierDto>
{
    private readonly ISupplierRepository _repository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CreateSupplierCommandHandler(ISupplierRepository repository,
        IUnitOfWork unitOfWork, IMapper mapper)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<SupplierDto> Handle(CreateSupplierCommand command, CancellationToken ct)
    {
        var supplier = new Supplier(command.Name, command.CNPJ,
            command.Email, command.Phone, command.Address);

        await _repository.AddAsync(supplier, ct);
        await _unitOfWork.CommitAsync(ct);

        return _mapper.Map<SupplierDto>(supplier);
    }
}