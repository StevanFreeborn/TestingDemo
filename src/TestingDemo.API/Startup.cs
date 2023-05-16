namespace TestingDemo.API.Startup;

public static class Startup
{
  public static WebApplicationBuilder AddConfiguration(this WebApplicationBuilder builder)
  {
    builder.Services.Configure<MongoDbSettings>(
      builder.Configuration.GetSection("MongoDbSettings")
    );

    builder.Services.Configure<SendGridProviderSettings>(
      builder.Configuration.GetSection("SendGrid")
    );

    builder.Services.Configure<EmailSettings>(
      builder.Configuration.GetSection("Email")
    );

    builder.Services.Configure<JwtTokenSettings>(
      builder.Configuration.GetSection("JWT")
    );

    return builder;
  }

  public static WebApplicationBuilder AddAndConfigureJWTAuth(this WebApplicationBuilder builder)
  {
    builder.Services
    .AddAuthentication(
      x =>
      {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      }
    )
    .AddJwtBearer(
      options => options.TokenValidationParameters = new TokenValidationParameters
      {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
          Encoding.UTF8.GetBytes(
            builder.Configuration.GetSection("JWT:Key").Value!
          )
        ),
        ValidIssuer = builder.Configuration.GetSection("JWT:Issuer").Value,
        ValidAudience = builder.Configuration.GetSection("JWT:Audience").Value,
      }
    );

    return builder;
  }

  public static IServiceCollection AddAutoMapperAndProfiles(this IServiceCollection services)
  {
    return services.AddAutoMapper(
      config => config.AddProfile<MapperProfile>()
    );
  }

  public static IServiceCollection AddAndConfigureAPIVersioning(this IServiceCollection services)
  {
    return services.AddApiVersioning(
      config =>
      {
        config.DefaultApiVersion = new ApiVersion(1, 0);
        config.AssumeDefaultVersionWhenUnspecified = true;
        config.ReportApiVersions = true;
        config.ApiVersionReader = new HeaderApiVersionReader("x-api-version");
      }
    );
  }

  public static IServiceCollection AddAndConfigureSwaggerGen(this IServiceCollection services)
  {
    return services.AddSwaggerGen(
      config =>
      {
        config.AddSecurityDefinition(
          "Bearer",
          new OpenApiSecurityScheme
          {
            Description = "JWT Authorization header using the Bearer scheme.",
            Type = SecuritySchemeType.Http,
            Scheme = "Bearer",
          }
        );
        config.OperationFilter<AuthorizeOperationFilter>();
      }
    );
  }
}