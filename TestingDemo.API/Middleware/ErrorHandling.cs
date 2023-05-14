namespace TestingDemo.API.Middleware;

public class ErrorHandling
{
  private readonly RequestDelegate _next;

  public ErrorHandling(RequestDelegate next)
  {
    _next = next;
  }

  public async Task InvokeAsync(HttpContext context)
  {
    try
    {
      await _next(context);
    }
    catch (Exception ex)
    {
      var problem = GetProblemDetails(ex);
      context.Response.StatusCode = problem.Status!.Value;
      context.Response.ContentType = "application/problem+json";
      await context.Response.WriteAsync(JsonSerializer.Serialize(problem));
    }
  }

  private static ProblemDetails GetProblemDetails(Exception ex)
  {
    var code = ex switch
    {
      ValidationException
      or ModelAlreadyExistsException
      or InvalidLoginException => HttpStatusCode.BadRequest,
      ModelNotFoundException => HttpStatusCode.NotFound,
      _ => HttpStatusCode.InternalServerError,
    };

    return new ProblemDetails
    {
      Status = (int) code,
      Title = "An problem occurred while processing the request",
      Detail = ex.Message,
    };
  }
}
