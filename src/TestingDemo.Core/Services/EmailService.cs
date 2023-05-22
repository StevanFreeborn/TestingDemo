namespace TestingDemo.Core.Services;

public class EmailService : IEmailService
{
  private readonly IEmailProvider _client;
  private readonly EmailSettings _settings;

  public EmailService(IEmailProvider client, EmailSettings settings)
  {
    _client = client;
    _settings = settings;
  }

  public async Task SendPasswordResetEmail(string email, string token)
  {
    var lineOne = "In order to reset your password, please open the following link in a web browser and follow the instructions.";
    var resetLink = $"https://localhost:5001/Public/ResetPassword?t={token}";
    var lineTwo = "If you did not submit a request to reset your password please ignore this email.";

    var subject = "Password Reset";
    var htmlContent = $@"
      <h2>Password Reset</h2>
        <p>
          {lineOne}
        </p>
        <p>
          <a href=""{resetLink}"" target=""_blank"">{resetLink}</a>
        </p>
        <p>
          {lineTwo}
        </p>
    ";
    var textContent = $@"{lineOne}: {resetLink}. {lineTwo}";

    var message = new EmailMessage
    {
      Sender = _settings.SystemEmailAddress,
      Recipient = email,
      Subject = subject,
      TextContent = textContent,
      HtmlContent = htmlContent,
    };

    await _client.SendEmail(message);
  }
}