namespace TestingDemo.Core.Models;

public class AuthToken
{
  public string Id { get; set; } = string.Empty;
  public string Token { get; set; } = string.Empty;
  public string UserId { get; set; } = string.Empty;
  public DateTime ExpiresAt { get; set; } = DateTime.UtcNow;
  public bool Revoked { get; set; } = false;
  public AuthTokenType TokenType { get; set; }
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
  public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
