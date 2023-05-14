namespace TestingDemo.API.Models;

public class TokenSettings
{
  public string JwtKey { get; set; }
  public string JwtIssuer { get; set; }
  public string JwtAudience { get; set; }
}