namespace TestingDemo.API.Dtos;

public class NewUserDto
{
  [Required]
  public string Username { get; set; } = string.Empty;

  [Required]
  public string Email { get; set; } = string.Empty;

  [Required]
  public string Password { get; set; } = string.Empty;
}