namespace TestingDemo.Core.Authentication;

public class Authenticator : IAuthenticator
{
  public string HashPassword(string password, string salt)
  {
    var passwordBytes = Encoding.UTF8.GetBytes(password);
    var saltBytes = Convert.FromBase64String(salt);

    var saltedPassword = new byte[saltBytes.Length + passwordBytes.Length];
    Array.Copy(saltBytes, saltedPassword, saltBytes.Length);
    Array.Copy(passwordBytes, 0, saltedPassword, saltBytes.Length, passwordBytes.Length);

    var hash = SHA256.HashData(saltedPassword);

    return Convert.ToBase64String(hash);
  }

  public string GenerateRandomSalt()
  {
    var saltBytes = new byte[32];
    using var rng = RandomNumberGenerator.Create();
    rng.GetBytes(saltBytes);
    return Convert.ToBase64String(saltBytes);
  }

  public bool VerifyPassword(string password, string hashedPassword, string salt)
  {
    var newHashedPassword = HashPassword(password, salt);
    return newHashedPassword == hashedPassword;
  }
}
