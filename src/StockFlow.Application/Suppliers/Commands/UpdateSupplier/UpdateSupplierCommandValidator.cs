namespace StockFlow.Application.Suppliers.Commands.UpdateSupplier;
using FluentValidation;

public class UpdateSupplierCommandValidator : AbstractValidator<UpdateSupplierCommand>
{
    public UpdateSupplierCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Id is required.");

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .MaximumLength(200).WithMessage("Name must not exceed 200 characters.");

        RuleFor(x => x.Email)
            .EmailAddress().WithMessage("Email is invalid.")
            .When(x => !string.IsNullOrEmpty(x.Email));
    }
}