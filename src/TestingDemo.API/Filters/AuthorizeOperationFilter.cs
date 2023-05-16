namespace TestingDemo.API.Filters;

public class AuthorizeOperationFilter : IOperationFilter
{
  public void Apply(OpenApiOperation operation, OperationFilterContext context)
  {
    var authAttributes = context.MethodInfo.DeclaringType?
    .GetCustomAttributes(true)
    .Union(context.MethodInfo.GetCustomAttributes(true))
    .OfType<AuthorizeAttribute>();

    if (authAttributes is null || authAttributes.Any() is false)
    {
      return;
    }

    var securityReq = new OpenApiSecurityRequirement
    {
      {
        new OpenApiSecurityScheme
        {
            Reference = new OpenApiReference
            {
                Type = ReferenceType.SecurityScheme,
                Id = "Bearer"
            },
            In = ParameterLocation.Header
        },
        Array.Empty<string>()
      }
    };

    operation.Security = new List<OpenApiSecurityRequirement> { securityReq };
  }
}