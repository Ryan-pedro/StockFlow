namespace StockFlow.API.Controllers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using StockFlow.Application.Movements.Commands.RegisterMovement;
using StockFlow.Application.Movements.Queries.GetMovements;

[ApiController]
[Route("api/[controller]")]
public class MovementsController : ControllerBase
{
    private readonly IMediator _mediator;

    public MovementsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] Guid? productId, CancellationToken ct)
        => Ok(await _mediator.Send(new GetMovementsQuery(productId), ct));

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] RegisterMovementCommand command, CancellationToken ct)
    {
        var result = await _mediator.Send(command, ct);
        return CreatedAtAction(nameof(GetAll), new { id = result.Id }, result);
    }
}