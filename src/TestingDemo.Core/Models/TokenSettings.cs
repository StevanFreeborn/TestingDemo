namespace TestingDemo.Core.Models;

public class JwtTokenSettings
{
  public string Key { get; set; } = string.Empty;
  public string Issuer { get; set; } = string.Empty;
  public string Audience { get; set; } = string.Empty;
  public int TokenLifetimeMinutes { get; set; } = 10;
}