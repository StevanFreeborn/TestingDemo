using TestingDemo.Core.Enums;

namespace TestingDemo.Infrastructure.Data.Mongo.Repositories;

public class MongoTokenRepository : ITokenRepository
{
  private readonly MongoDbContext _context;
  public MongoTokenRepository(MongoDbContext context)
  {
    _context = context;
  }

  public async Task<AuthToken> CreateTokenAsync(AuthToken token)
  {
    await _context.AuthTokens.InsertOneAsync(token);
    return token;
  }

  public async Task<AuthToken?> GetToken(string token, AuthTokenType tokenType)
  {
    return await _context.AuthTokens
    .Find(t => t.Token == token && t.TokenType == tokenType)
    .FirstOrDefaultAsync();
  }

  public async Task<AuthToken?> UpdateTokenAsync(AuthToken updatedToken)
  {
    var filter = Builders<AuthToken>.Filter.Eq(t => t.Id, updatedToken.Id);
    var options = new FindOneAndReplaceOptions<AuthToken, AuthToken>
    {
      ReturnDocument = ReturnDocument.After
    };

    updatedToken.UpdatedAt = DateTime.UtcNow;

    return await _context.AuthTokens.FindOneAndReplaceAsync(filter, updatedToken, options);
  }

  public async Task DeleteUsersRevokedAndExpiredTokens(string userId, AuthTokenType tokenType)
  {
    var filter = Builders<AuthToken>.Filter.Where(
      t => t.UserId == userId && (t.Revoked || t.ExpiresAt < DateTime.UtcNow)
    );

    await _context.AuthTokens.DeleteManyAsync(filter);
  }

  public async Task RevokeAllRefreshTokensForUser(string userId)
  {
    var filter = Builders<AuthToken>.Filter.Eq(t => t.UserId, userId);
    var updates = Builders<AuthToken>.Update
    .Set(t => t.Revoked, true)
    .Set(t => t.UpdatedAt, DateTime.UtcNow);

    await _context.AuthTokens.UpdateManyAsync(filter, updates);
  }
}