namespace TestingDemo.Core.Interfaces;

public interface ITokenRepository
{
  Task<AuthToken> CreateTokenAsync(AuthToken token);
  Task<AuthToken?> GetToken(string token, AuthTokenType tokenType);
  Task<AuthToken?> UpdateTokenAsync(AuthToken updatedToken);
  Task DeleteUsersRevokedAndExpiredTokens(string userId, AuthTokenType tokenType);
  Task RevokeAllRefreshTokensForUser(string userId);
}