namespace TestingDemo.Core.Exceptions;

public class InvalidForgotPasswordRequestException : Exception
{
  public InvalidForgotPasswordRequestException() : base("Unable to initiate password reset")
  {
  }

  public InvalidForgotPasswordRequestException(Exception innerException) : base("Unable to initiate password reset", innerException)
  {
  }
}