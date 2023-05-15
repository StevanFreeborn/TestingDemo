namespace TestingDemo.Core.Exceptions;

public class ModelNotUpdatedException : Exception
{
  public ModelNotUpdatedException(string message) : base(message)
  {
  }

  public ModelNotUpdatedException(string message, Exception innerException) : base(message, innerException)
  {
  }
}
