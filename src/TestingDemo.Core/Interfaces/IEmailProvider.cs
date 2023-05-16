namespace TestingDemo.Core.Interfaces;

public interface IEmailProvider
{
  Task SendEmail(EmailMessage message);
}