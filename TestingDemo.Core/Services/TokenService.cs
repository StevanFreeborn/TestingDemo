namespace TestingDemo.Core.Services;

public class TokenService
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
      ExpiresAt = DateTime.UtcNow.AddDays(7),
      TokenType = AuthTokenType.RefreshToken,
    };

    return await _tokenRepository.CreateTokenAsync(authToken);
  }

  public async Task VerifyRefreshToken(string? token, Claim? userId)
  {
    if (token == null)
    {
      // throw invalid refresh token exception
      throw new ApplicationException();
    }
    var refreshToken = await _tokenRepository.GetToken(token, AuthTokenType.RefreshToken);

    if (refreshToken == null || userId == null || refreshToken.UserId != userId.Value)
    {
      throw new ApplicationException();
    }

    if (refreshToken.Revoked == true)
    {
      // throw new invalid refresh token exception
      // and invalidate all refresh tokens for user
    }

    if (refreshToken.ExpiresAt < DateTime.UtcNow)
    {
      // throw new invalid refresh token exception
    }
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