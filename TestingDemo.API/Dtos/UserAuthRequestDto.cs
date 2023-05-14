namespace TestingDemo.API.Dtos;

public class UserAuthRequestDto
{
  [Required]
  public string Username { get; set; } = string.Empty;

  [Required]
  public string Password { get; set; } = string.Empty;
}