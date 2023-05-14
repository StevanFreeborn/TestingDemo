namespace TestingDemo.Core.Exceptions;

public class InvalidLoginException : Exception
{
  public InvalidLoginException() : base("Invalid username or password")
  {
  }

  public InvalidLoginException(Exception innerException) : base("Invalid username or password", innerException)
  {
  }
}