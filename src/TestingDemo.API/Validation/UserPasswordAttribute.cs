namespace TestingDemo.API.Validation;

public class UserPasswordAttribute : RegularExpressionAttribute
{
  // At least one uppercase letter ((?=.*[A-Z]))
  // At least one lowercase letter ((?=.*[a-z]))
  // At least one number ((?=.*\d))
  // At least one special character ((?=.*\W))
  // Must be at least 8 characters long ({8,})
  public UserPasswordAttribute() : base(@"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$")
  {
    ErrorMessage = "The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
  }
}

