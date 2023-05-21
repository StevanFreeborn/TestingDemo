namespace TestingDemo.API.Startup;

public static class Startup
{
  public static IServiceCollection AddSettings(this IServiceCollection services, ConfigurationManager config)
  {
    services.Configure<MongoDbSettings>(
      config.GetSection("MongoDbSettings")
    );

    services.Configure<SendGridProviderSettings>(
      config.GetSection("SendGrid")
    );

    services.Configure<EmailSettings>(
      config.GetSection("Email")
    );

    services.Configure<JwtTokenSettings>(
      config.GetSection("JWT")
    );

    return services;
  }

  public static IServiceCollection AddAndConfigureJWTAuth(this IServiceCollection services, ConfigurationManager config)
  {
    services
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
            config.GetSection("JWT:Key").Value!
          )
        ),
        ValidIssuer = config.GetSection("JWT:Issuer").Value,
        ValidAudience = config.GetSection("JWT:Audience").Value,
        ClockSkew = TimeSpan.Zero,
      }
    );

    return services;
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