namespace TestingDemo.API.Dtos;

public class MapperProfile : Profile
{
  public MapperProfile()
  {
    CreateMap<User, NewUserDto>().ReverseMap();
    CreateMap<User, UserDto>().ReverseMap();
    CreateMap<User, AuthUserDto>()
    .ForMember(
      dest => dest.User,
      opt => opt.MapFrom(src => src)
    );
  }
}