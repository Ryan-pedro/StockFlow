namespace StockFlow.Application.Auth.Commands.Login;
using MediatR;
using StockFlow.Application.Auth.DTOs;

public record LoginCommand(
    string Email,
    string Password) : IRequest<LoginResponseDto>;