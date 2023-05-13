namespace TestingDemo.API.Dtos;

public class NewUserDto
{
  [Required]
  [MaxLength(150)]
  public string Username { get; set; } = string.Empty;

  [Required]
  [EmailAddress]
  public string Email { get; set; } = string.Empty;

  [Required]
  [MinLength(8)]
  public string Password { get; set; } = string.Empty;
}