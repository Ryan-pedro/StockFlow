namespace StockFlow.Application.Common.Mappings;
using AutoMapper;
using StockFlow.Application.Common.DTOs;
using StockFlow.Domain.Entities;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Category
        CreateMap<Category, CategoryDto>();

        // Supplier
        CreateMap<Supplier, SupplierDto>();

        // Product
        CreateMap<Product, ProductDto>()
            .ForMember(dest => dest.CategoryName,
                opt => opt.MapFrom(src => src.Category.Name))
            .ForMember(dest => dest.SupplierName,
                opt => opt.MapFrom(src => src.Supplier != null ? src.Supplier.Name : null))
            .ForMember(dest => dest.IsLowStock,
                opt => opt.MapFrom(src => src.IsLowStock()));

        // Movement
        CreateMap<Movement, MovementDto>()
            .ForMember(dest => dest.Type,
                opt => opt.MapFrom(src => src.Type.ToString()))
            .ForMember(dest => dest.ProductName,
                opt => opt.MapFrom(src => src.Product.Name))
            .ForMember(dest => dest.ProductCode,
                opt => opt.MapFrom(src => src.Product.Code))
            .ForMember(dest => dest.UserName,
                opt => opt.MapFrom(src => src.User.Name));
    }
}