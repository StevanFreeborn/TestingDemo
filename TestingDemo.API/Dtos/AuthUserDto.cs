namespace TestingDemo.API.Dtos;

public class AuthUserDto
{
  public string Token { get; set; } = string.Empty;
  public UserDto User { get; set; } = new UserDto();
}