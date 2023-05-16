namespace TestingDemo.Core.Exceptions;

public class InvalidRefreshTokenException : Exception
{
  public InvalidRefreshTokenException() : base("Refresh token is invalid")
  {
  }

  public InvalidRefreshTokenException(Exception innerException) : base("Refresh token token is invalid", innerException)
  {
  }
}