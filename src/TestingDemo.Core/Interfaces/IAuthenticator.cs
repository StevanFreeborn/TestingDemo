namespace TestingDemo.Core.Interfaces;

public interface IAuthenticator
{
  string GenerateRandomSalt();
  string HashPassword(string password, string salt);
  bool VerifyPassword(string password, string hashedPassword, string salt);
}