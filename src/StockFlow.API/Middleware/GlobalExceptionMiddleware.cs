namespace StockFlow.API.Middleware;
using System.Net;
using System.Text.Json;
using FluentValidation;
using StockFlow.Domain.Exceptions;

public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    public GlobalExceptionMiddleware(RequestDelegate next,
        ILogger<GlobalExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        var statusCode = ex switch
        {
            NotFoundException => HttpStatusCode.NotFound,
            DomainException => HttpStatusCode.BadRequest,
            ValidationException => HttpStatusCode.UnprocessableEntity,
            _ => HttpStatusCode.InternalServerError
        };

        var response = ex switch
        {
            ValidationException vex => new
            {
                status = (int)statusCode,
                message = "Validation failed.",
                errors = vex.Errors.Select(e => e.ErrorMessage)
            },
            _ => new
            {
                status = (int)statusCode,
                message = ex.Message,
                errors = Enumerable.Empty<string>()
            }
        };

        _logger.LogError(ex, "Exception: {Message}", ex.Message);

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        await context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}