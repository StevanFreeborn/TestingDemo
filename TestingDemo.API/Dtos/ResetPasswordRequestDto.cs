namespace TestingDemo.API.Dtos;

public class ForgotPasswordRequestDto
{
  [Required]
  public string Username { get; set; } = string.Empty;
}