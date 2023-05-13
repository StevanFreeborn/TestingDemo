namespace TestingDemo.API.Dtos;

public class NewUserDto
{
  // At least one uppercase letter ((?=.*[A-Z]))
  // At least one lowercase letter ((?=.*[a-z]))
  // At least one number ((?=.*\d))
  // At least one special character ((?=.*\W))
  // Must be at least 8 characters long ({8,})
  private const string PasswordRegex = @"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$";
  private const string PasswordErrorMessage = "The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";

  [Required]
  [MaxLength(150)]
  public string Username { get; set; } = string.Empty;

  [Required]
  [EmailAddress]
  public string Email { get; set; } = string.Empty;

  [Required]
  [RegularExpression(PasswordRegex, ErrorMessage = PasswordErrorMessage)]
  public string Password { get; set; } = string.Empty;
}