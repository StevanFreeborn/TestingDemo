namespace TestingDemo.API.Dtos.Auth;

public class ResetPasswordRequestDto
{
  [Required]
  public string Token { get; set; } = string.Empty;

  [Required]
  [UserPassword]
  public string NewPassword { get; set; } = string.Empty;
}