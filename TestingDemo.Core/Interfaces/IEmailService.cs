namespace TestingDemo.Core.Interfaces;

public interface IEmailService
{
  Task SendPasswordResetEmail(string email, string token);
}