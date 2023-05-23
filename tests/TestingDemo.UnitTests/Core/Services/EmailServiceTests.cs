namespace TestingDemo.UnitTests.Core.Services;

public class EmailServiceTests
{
  private readonly Mock<IEmailProvider> _emailProviderMock;
  private readonly EmailSettings _emailSettings;
  private readonly EmailService _emailService;
  public EmailServiceTests()
  {
    _emailProviderMock = new Mock<IEmailProvider>();
    _emailSettings = new EmailSettings
    {
      SystemEmailAddress = "testing@test.com"
    };

    _emailService = new EmailService(
      _emailProviderMock.Object,
      _emailSettings
    );
  }

  [Fact]
  public async Task SendPasswordResetEmail_WhenCalled_ShouldSendPasswordResetEmailWithTokenToEmailGiven()
  {
    var recipient = "recipient";
    var token = "token";
    var expectedSubject = "Password Reset";

    await _emailService.SendPasswordResetEmail(recipient, token);

    _emailProviderMock.Verify(
      x => x.SendEmail(
        It.Is<EmailMessage>(
          m =>
            m.Sender == _emailSettings.SystemEmailAddress &&
            m.Recipient == recipient &&
            m.Subject == expectedSubject &&
            m.TextContent.Contains(token) &&
            m.HtmlContent.Contains(token)
        )
      ),
      Times.Once()
    );
  }
}