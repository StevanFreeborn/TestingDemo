namespace TestingDemo.API.Dtos.Auth;

public class ResetPasswordRequestDto
{
  [Required]
  public string Token { get; set; } = string.Empty;

  [Required]
  [UserPassword]
  public string Password { get; set; } = string.Empty;

  [Required]
  public string ConfirmPassword { get; set; } = string.Empty;
}