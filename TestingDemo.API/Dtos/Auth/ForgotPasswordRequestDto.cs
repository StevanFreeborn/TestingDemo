namespace TestingDemo.API.Dtos.Auth;

public class ForgotPasswordRequestDto
{
  [Required]
  public string Username { get; set; } = string.Empty;
}