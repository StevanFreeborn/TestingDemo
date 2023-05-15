namespace TestingDemo.Core.Services;

public class TokenService
{
  private readonly TokenSettings _tokenSettings;
  private readonly ITokenRepository _tokenRepository;

  public TokenService(TokenSettings tokenSettings, ITokenRepository tokenRepository)
  {
    _tokenSettings = tokenSettings;
    _tokenRepository = tokenRepository;
  }

  public async Task<AuthToken> CreateResetPasswordTokenForUser(User user)
  {
    var authToken = new AuthToken
    {
      UserId = user.Id,
      Token = GenerateToken(),
      ExpiresAt = DateTime.UtcNow.AddMinutes(15),
      TokenType = AuthTokenType.PasswordResetToken,
    };
    return await _tokenRepository.CreateTokenAsync(authToken);
  }

  public async Task<AuthToken> GetPasswordResetToken(string token)
  {
    var authToken = await _tokenRepository.GetToken(token, AuthTokenType.PasswordResetToken);

    if (authToken == null || authToken.ExpiresAt < DateTime.UtcNow)
    {
      throw new InvalidResetPasswordTokenException();
    }

    return authToken;
  }

  public async Task RevokeToken(AuthToken token)
  {
    token.Revoked = true;

    var updatedToken = await _tokenRepository.UpdateTokenAsync(token);

    if (updatedToken != null)
    {
      return;
    }

    throw new ModelNotUpdatedException($"Unable to update token {token.Id} as revoked");
  }

  public async Task RemoveExpiredAndRevokedPasswordResetTokensForUser(string userId)
  {
    await _tokenRepository.DeleteUsersRevokedAndExpiredTokens(userId, AuthTokenType.PasswordResetToken);
  }

  private static string GenerateToken()
  {
    var randomBytes = new byte[32];
    using var rng = RandomNumberGenerator.Create();
    rng.GetBytes(randomBytes);
    var token = Convert.ToBase64String(randomBytes);
    return token;
  }
}