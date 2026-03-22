namespace StockFlow.Application.Movements.Commands.RegisterMovement;
using AutoMapper;
using MediatR;
using StockFlow.Application.Common.DTOs;
using StockFlow.Domain.Entities;
using StockFlow.Domain.Enums;
using StockFlow.Domain.Exceptions;
using StockFlow.Domain.Interfaces;
using StockFlow.Domain.Interfaces.Repositories;

public class RegisterMovementCommandHandler : IRequestHandler<RegisterMovementCommand, MovementDto>
{
    private readonly IProductRepository _productRepository;
    private readonly IMovementRepository _movementRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public RegisterMovementCommandHandler(IProductRepository productRepository,
        IMovementRepository movementRepository, IUnitOfWork unitOfWork, IMapper mapper)
    {
        _productRepository = productRepository;
        _movementRepository = movementRepository;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<MovementDto> Handle(RegisterMovementCommand command, CancellationToken ct)
    {
        var product = await _productRepository.GetByIdAsync(command.ProductId, ct)
            ?? throw new NotFoundException(nameof(Product), command.ProductId);

        var type = Enum.Parse<MovementType>(command.Type);

        product.ApplyMovement(type, command.Quantity);

        var movement = new Movement(
            command.ProductId,
            command.UserId,
            type,
            command.Quantity,
            command.UnitPrice,
            command.Notes);

        _productRepository.Update(product);
        await _movementRepository.AddAsync(movement, ct);
        await _unitOfWork.CommitAsync(ct);

        var created = await _movementRepository.GetByIdAsync(movement.Id, ct);
        return _mapper.Map<MovementDto>(created);
    }
}