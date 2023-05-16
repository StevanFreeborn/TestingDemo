namespace TestingDemo.Core.Interfaces;

public interface ITokenService
{
  Task<AuthToken> CreateRefreshTokenForUser(User user);
  Task<AuthToken> CreateResetPasswordTokenForUser(User user);
  Task<AuthToken> GetPasswordResetToken(string token);
  Task RemoveExpiredAndRevokedPasswordResetTokensForUser(string userId);
  Task RemoveExpiredAndRevokedRefreshTokensForUser(string userId);
  Task RevokeToken(AuthToken token);
  Task<AuthToken> VerifyAndGetRefreshToken(string? token, string userId);
}