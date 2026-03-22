namespace StockFlow.Application.Suppliers.Commands.UpdateSupplier;
using MediatR;
using StockFlow.Application.Common.DTOs;

public record UpdateSupplierCommand(
    Guid Id,
    string Name,
    string? CNPJ,
    string? Email,
    string? Phone,
    string? Address) : IRequest<SupplierDto>;