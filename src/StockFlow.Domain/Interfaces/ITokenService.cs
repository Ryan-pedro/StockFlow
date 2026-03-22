namespace StockFlow.Domain.Interfaces;
using StockFlow.Domain.Entities;

public interface ITokenService
{
    string GenerateToken(User user);
}