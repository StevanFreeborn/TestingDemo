using System;
using System.Security.Cryptography;

namespace TestingDemo.API.Services;

public class TokenService
{
  public string GenerateResetPasswordToken()
  {
    var randomBytes = new byte[32];

    using (var rng = RandomNumberGenerator.Create())
    {
      rng.GetBytes(randomBytes);
    }

    var token = Convert.ToBase64String(randomBytes);
    return token;
  }
}