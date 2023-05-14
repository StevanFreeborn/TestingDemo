namespace TestingDemo.API.Services;

public class TokenService
{
  private readonly TokenSettings _tokenSettings;

  public TokenService(TokenSettings tokenSettings)
  {
    _tokenSettings = tokenSettings;
  }

  public string GenerateResetPasswordToken()
  {
    var randomBytes = new byte[32];
    using var rng = RandomNumberGenerator.Create();
    rng.GetBytes(randomBytes);
    var token = Convert.ToBase64String(randomBytes);
    return token;
  }
}