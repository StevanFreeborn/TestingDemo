namespace TestingDemo.Core.DependencyInjection;

public static class DependencyInjection
{
  public static IServiceCollection AddCore(this IServiceCollection services)
  {
    services.AddSingleton(
      sp => sp.GetRequiredService<IOptions<EmailSettings>>().Value
    );

    services.AddSingleton(
      sp => sp.GetRequiredService<IOptions<JwtTokenSettings>>().Value
    );

    services.AddScoped<IUserService, UserService>();
    services.AddScoped<IEmailService, EmailService>();
    services.AddScoped<ITokenService, TokenService>();

    return services;
  }
}