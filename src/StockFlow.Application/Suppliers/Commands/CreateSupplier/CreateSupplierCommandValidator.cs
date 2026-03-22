namespace StockFlow.Application.Suppliers.Commands.CreateSupplier;
using FluentValidation;

public class CreateSupplierCommandValidator : AbstractValidator<CreateSupplierCommand>
{
    public CreateSupplierCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .MaximumLength(200).WithMessage("Name must not exceed 200 characters.");

        RuleFor(x => x.CNPJ)
            .MaximumLength(18).WithMessage("CNPJ must not exceed 18 characters.");

        RuleFor(x => x.Email)
            .EmailAddress().WithMessage("Email is invalid.")
            .MaximumLength(254).WithMessage("Email must not exceed 254 characters.")
            .When(x => !string.IsNullOrEmpty(x.Email));

        RuleFor(x => x.Phone)
            .MaximumLength(20).WithMessage("Phone must not exceed 20 characters.");
    }
}