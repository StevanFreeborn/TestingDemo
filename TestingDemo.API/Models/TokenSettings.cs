namespace TestingDemo.API.Models;

public class TokenSettings
{
  public string JwtKey { get; set; } = string.Empty;
  public string JwtIssuer { get; set; } = string.Empty;
  public string JwtAudience { get; set; } = string.Empty;
}