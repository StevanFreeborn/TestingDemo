namespace TestingDemo.API.Dtos;

public class MapperProfile : Profile
{
  public MapperProfile()
  {
    CreateMap<User, NewUserDto>().ReverseMap();
    CreateMap<User, UserDto>().ReverseMap();

  }
}