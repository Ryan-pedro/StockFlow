namespace StockFlow.Application.Suppliers.Commands.DeleteSupplier;
using MediatR;

public record DeleteSupplierCommand(Guid Id) : IRequest;