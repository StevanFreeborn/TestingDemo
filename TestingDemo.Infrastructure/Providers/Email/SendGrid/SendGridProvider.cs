using System.Text.Json;

namespace TestingDemo.Infrastructure.Providers.Email.SendGrid;

public class SendGridProvider : IEmailProvider
{
  private readonly SendGridClient _client;
  public SendGridProvider(SendGridProviderSettings settings)
  {
    _client = new SendGridClient(settings.ApiKey);
  }

  public async Task SendEmail(EmailMessage message)
  {
    var msg = MailHelper.CreateSingleEmail(
      new EmailAddress(message.Sender),
      new EmailAddress(message.Recipient),
      message.Subject,
      message.TextContent,
      message.HtmlContent
    );

    var response = await _client.SendEmailAsync(msg);

    if (response.IsSuccessStatusCode is true)
    {
      return;
    }

    var statusCode = response.StatusCode;
    var errors = await response.DeserializeResponseBodyAsync();
    throw new ApplicationException(
      JsonSerializer.Serialize(
        new
        {
          statusCode,
          body = errors,
        }
      )
    );
  }
}