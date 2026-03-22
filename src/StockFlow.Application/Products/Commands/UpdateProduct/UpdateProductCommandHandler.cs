namespace StockFlow.Application.Products.Commands.UpdateProduct;
using AutoMapper;
using MediatR;
using StockFlow.Application.Common.DTOs;
using StockFlow.Domain.Entities;
using StockFlow.Domain.Exceptions;
using StockFlow.Domain.Interfaces;
using StockFlow.Domain.Interfaces.Repositories;

public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, ProductDto>
{
    private readonly IProductRepository _repository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public UpdateProductCommandHandler(IProductRepository repository,
        IUnitOfWork unitOfWork, IMapper mapper)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<ProductDto> Handle(UpdateProductCommand command, CancellationToken ct)
    {
        var product = await _repository.GetByIdAsync(command.Id, ct)
            ?? throw new NotFoundException(nameof(Product), command.Id);

        product.Update(command.Name, command.CategoryId, command.SupplierId,
            command.UnitPrice, command.MinimumStock, command.Description);

        _repository.Update(product);
        await _unitOfWork.CommitAsync(ct);

        var updated = await _repository.GetByIdAsync(product.Id, ct);
        return _mapper.Map<ProductDto>(updated);
    }
}