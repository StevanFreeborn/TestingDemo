namespace TestingDemo.API.Dtos.Users;

public class NewUserDto
{
  [Required]
  [MaxLength(150)]
  public string Username { get; set; } = string.Empty;

  [Required]
  [EmailAddress]
  public string Email { get; set; } = string.Empty;

  [Required]
  [UserPassword]
  public string Password { get; set; } = string.Empty;
}