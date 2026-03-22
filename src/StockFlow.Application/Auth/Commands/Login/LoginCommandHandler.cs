namespace StockFlow.Application.Auth.Commands.Login;
using BC = BCrypt.Net.BCrypt;
using MediatR;
using StockFlow.Application.Auth.DTOs;
using StockFlow.Domain.Exceptions;
using StockFlow.Domain.Interfaces;
using StockFlow.Domain.Interfaces.Repositories;

public class LoginCommandHandler : IRequestHandler<LoginCommand, LoginResponseDto>
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenService _tokenService;

    public LoginCommandHandler(IUserRepository userRepository, ITokenService tokenService)
    {
        _userRepository = userRepository;
        _tokenService = tokenService;
    }

    public async Task<LoginResponseDto> Handle(LoginCommand command, CancellationToken ct)
    {
        var user = await _userRepository.GetByEmailAsync(command.Email, ct)
            ?? throw new DomainException(DomainErrors.User.InvalidCredentials());

        if (!BC.Verify(command.Password, user.PasswordHash))
            throw new DomainException(DomainErrors.User.InvalidCredentials());

        if (!user.IsActive)
            throw new DomainException(DomainErrors.User.InvalidCredentials());

        user.RecordLogin();

        var token = _tokenService.GenerateToken(user);

        return new LoginResponseDto
        {
            Token = token,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role.ToString(),
            ExpiresAt = DateTime.UtcNow.AddHours(8)
        };
    }
}