namespace TestingDemo.Core.Services;

public class TokenService : ITokenService
{
  private readonly ITokenRepository _tokenRepository;

  public TokenService(ITokenRepository tokenRepository)
  {
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

  public async Task<AuthToken> CreateRefreshTokenForUser(User user)
  {
    var authToken = new AuthToken
    {
      UserId = user.Id,
      Token = GenerateToken(),
      ExpiresAt = DateTime.UtcNow.AddHours(12),
      TokenType = AuthTokenType.RefreshToken,
    };

    return await _tokenRepository.CreateTokenAsync(authToken);
  }

  public async Task<AuthToken> VerifyAndGetRefreshToken(string? token)
  {
    if (token is null)
    {
      throw new InvalidRefreshTokenException();
    }

    var refreshToken = await _tokenRepository.GetToken(token, AuthTokenType.RefreshToken);

    if (refreshToken is null)
    {
      throw new InvalidRefreshTokenException();
    }

    if (refreshToken.Revoked is true)
    {
      await _tokenRepository.RevokeAllRefreshTokensForUser(refreshToken.UserId);
      throw new InvalidRefreshTokenException();
    }

    if (refreshToken.ExpiresAt < DateTime.UtcNow)
    {
      throw new InvalidRefreshTokenException();
    }

    return refreshToken;
  }

  public async Task<AuthToken> GetPasswordResetToken(string token)
  {
    var authToken = await _tokenRepository.GetToken(token, AuthTokenType.PasswordResetToken);

    if (authToken is null || authToken.ExpiresAt < DateTime.UtcNow)
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

  public async Task RemoveExpiredAndRevokedRefreshTokensForUser(string userId)
  {
    await _tokenRepository.DeleteUsersRevokedAndExpiredTokens(userId, AuthTokenType.RefreshToken);
  }

  private static string GenerateToken()
  {
    var randomBytes = new byte[32];
    using var rng = RandomNumberGenerator.Create();
    rng.GetBytes(randomBytes);
    var token = Convert.ToBase64String(randomBytes);
    return RemoveNonAlphaNumericCharacters(token);
  }

  private static string RemoveNonAlphaNumericCharacters(string input)
  {
    var pattern = @"[^A-Za-z0-9]";
    var replacement = string.Empty;
    var output = Regex.Replace(input, pattern, replacement);
    return output;
  }
}