namespace StockFlow.Application.Products.Commands.CreateProduct;
using AutoMapper;
using MediatR;
using StockFlow.Application.Common.DTOs;
using StockFlow.Domain.Entities;
using StockFlow.Domain.Interfaces;
using StockFlow.Domain.Interfaces.Repositories;

public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, ProductDto>
{
    private readonly IProductRepository _repository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CreateProductCommandHandler(IProductRepository repository,
        IUnitOfWork unitOfWork, IMapper mapper)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<ProductDto> Handle(CreateProductCommand command, CancellationToken ct)
    {
        var product = new Product(
            command.Name,
            command.Code,
            command.CategoryId,
            command.SupplierId,
            command.UnitPrice,
            command.MinimumStock,
            command.Description);

        await _repository.AddAsync(product, ct);
        await _unitOfWork.CommitAsync(ct);

        var created = await _repository.GetByIdAsync(product.Id, ct);
        return _mapper.Map<ProductDto>(created);
    }
}