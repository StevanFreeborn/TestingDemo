namespace TestingDemo.Core.Exceptions;

public class InvalidResetPasswordException : Exception
{
  public InvalidResetPasswordException(string message) : base(message)
  {
  }

  public InvalidResetPasswordException(string message, Exception innerException) : base(message, innerException)
  {
  }
}