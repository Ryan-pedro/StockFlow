namespace StockFlow.API.Controllers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using StockFlow.Application.Suppliers.Commands.CreateSupplier;
using StockFlow.Application.Suppliers.Commands.DeleteSupplier;
using StockFlow.Application.Suppliers.Commands.UpdateSupplier;
using StockFlow.Application.Suppliers.Queries.GetSuppliers;

[ApiController]
[Route("api/[controller]")]
public class SuppliersController : ControllerBase
{
    private readonly IMediator _mediator;

    public SuppliersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken ct)
        => Ok(await _mediator.Send(new GetSuppliersQuery(), ct));

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSupplierCommand command, CancellationToken ct)
    {
        var result = await _mediator.Send(command, ct);
        return CreatedAtAction(nameof(GetAll), new { id = result.Id }, result);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateSupplierCommand command, CancellationToken ct)
        => Ok(await _mediator.Send(command with { Id = id }, ct));

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        await _mediator.Send(new DeleteSupplierCommand(id), ct);
        return NoContent();
    }
}