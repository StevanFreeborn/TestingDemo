namespace TestingDemo.Core.Models;

public class EmailMessage
{
  public string Sender { get; set; } = string.Empty;
  public string Recipient { get; set; } = string.Empty;
  public string Subject { get; set; } = string.Empty;
  public string TextContent { get; set; } = string.Empty;
  public string HtmlContent { get; set; } = string.Empty;
}