namespace StockFlow.Application;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using StockFlow.Application.Common.Behaviors;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(
        this IServiceCollection services)
    {
        services.AddAutoMapper(cfg => cfg.AddMaps(typeof(DependencyInjection).Assembly));
        services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssembly(typeof(DependencyInjection).Assembly));

        services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly);

        services.AddTransient(typeof(IPipelineBehavior<,>),
            typeof(ValidationBehavior<,>));

        services.AddTransient(typeof(IPipelineBehavior<,>),
            typeof(LoggingBehavior<,>));

        return services;
    }
}