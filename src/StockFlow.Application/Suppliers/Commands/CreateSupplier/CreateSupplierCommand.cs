namespace StockFlow.Application.Suppliers.Commands.CreateSupplier;
using MediatR;
using StockFlow.Application.Common.DTOs;

public record CreateSupplierCommand(
    string Name,
    string? CNPJ,
    string? Email,
    string? Phone,
    string? Address) : IRequest<SupplierDto>;