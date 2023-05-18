namespace TestingDemo.API.Dtos.Auth;

public class AuthUserDto
{
  public DateTime? Expiration { get; set; }
  public int ExpiresIn { get; set; } = 0;
  public string Token { get; set; } = string.Empty;
  public UserDto User { get; set; } = new UserDto();
}