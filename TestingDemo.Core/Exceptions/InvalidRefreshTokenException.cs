namespace TestingDemo.Core.Exceptions;

public class InvalidRefreshToken : Exception
{
  public InvalidRefreshToken() : base("Refresh token is invalid")
  {
  }

  public InvalidRefreshToken(Exception innerException) : base("Refresh token token is invalid", innerException)
  {
  }
}