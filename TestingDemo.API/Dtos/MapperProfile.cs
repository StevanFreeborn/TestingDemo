namespace TestingDemo.API.Dtos;

public class MapperProfile : Profile
{
  public MapperProfile()
  {
    CreateMap<User, UserDto>().ReverseMap();
  }
}