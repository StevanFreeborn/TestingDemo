namespace TestingDemo.Infrastructure.DependencyInjection;

public static class DependencyInjection
{
  public static IServiceCollection AddInfrastructure(this IServiceCollection services)
  {
    services.AddSingleton(
      sp => sp.GetRequiredService<IOptions<MongoDbSettings>>().Value
    );

    services.AddSingleton(
      sp => sp.GetRequiredService<IOptions<SendGridProviderSettings>>().Value
    );

    services.AddSingleton<MongoDbContext>();
    services.AddScoped<IUserRepository, MongoUserRepository>();
    services.AddScoped<ITokenRepository, MongoTokenRepository>();
    services.AddScoped<IEmailProvider, SendGridProvider>();

    return services;
  }
}