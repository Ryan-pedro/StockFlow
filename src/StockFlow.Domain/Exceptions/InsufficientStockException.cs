namespace StockFlow.Domain.Exceptions;

public class InsufficientStockException : DomainException
{
    public InsufficientStockException(Guid productId, int available, int requested)
        : base($"Insufficient stock for product '{productId}'. " +
               $"Available: {available}, Requested: {requested}.")
    { }
}