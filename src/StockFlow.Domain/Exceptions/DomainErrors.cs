namespace StockFlow.Domain.Exceptions;

public static class DomainErrors
{
    public static class Product
    {
        public static string NotFound(Guid id) =>
            $"Product with id '{id}' was not found.";

        public static string CodeAlreadyExists(string code) =>
            $"A product with code '{code}' already exists.";

        public static string InsufficientStock(int available, int requested) =>
            $"Insufficient stock. Available: {available}, Requested: {requested}.";

        public static string InvalidPrice() =>
            "Unit price cannot be negative.";

        public static string InvalidMinimumStock() =>
            "Minimum stock cannot be negative.";

        public static string InvalidQuantity() =>
            "Quantity must be greater than zero.";
    }

    public static class Category
    {
        public static string NotFound(Guid id) =>
            $"Category with id '{id}' was not found.";

        public static string NameAlreadyExists(string name) =>
            $"A category with name '{name}' already exists.";
    }

    public static class Supplier
    {
        public static string NotFound(Guid id) =>
            $"Supplier with id '{id}' was not found.";

        public static string CnpjAlreadyExists(string cnpj) =>
            $"A supplier with CNPJ '{cnpj}' already exists.";
    }

    public static class User
    {
        public static string NotFound(Guid id) =>
            $"User with id '{id}' was not found.";

        public static string EmailAlreadyExists(string email) =>
            $"A user with email '{email}' already exists.";

        public static string InvalidCredentials() =>
            "Invalid email or password.";
    }

    public static class Movement
    {
        public static string NotFound(Guid id) =>
            $"Movement with id '{id}' was not found.";

        public static string InvalidType() =>
            "Movement type must be 'Entry' or 'Exit'.";
    }
}
