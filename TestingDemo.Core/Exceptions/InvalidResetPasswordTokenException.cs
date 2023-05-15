namespace TestingDemo.Core.Exceptions;

public class InvalidResetPasswordTokenException : Exception
{
  public InvalidResetPasswordTokenException() : base("Reset password token is invalid")
  {
  }

  public InvalidResetPasswordTokenException(Exception innerException) : base("Reset password token is invalid", innerException)
  {
  }
}