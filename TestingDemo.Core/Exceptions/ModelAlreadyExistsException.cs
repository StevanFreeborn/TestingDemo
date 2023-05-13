namespace TestingDemo.Core.Exceptions;

public class ModelAlreadyExistsException : Exception
{
  public ModelAlreadyExistsException(string message) : base(message)
  {
  }

  public ModelAlreadyExistsException(string message, Exception innerException) : base(message, innerException)
  {
  }
}