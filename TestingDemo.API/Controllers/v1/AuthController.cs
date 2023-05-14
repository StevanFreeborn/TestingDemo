namespace TestingDemo.API.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("/api/auth")]
[Produces("application/json")]
public class AuthController : ControllerBase
{
  private readonly IMapper _mapper;
  private readonly UserService _userService;
  private readonly EmailService _emailService;
  private readonly TokenService _tokenService;

  public AuthController(
    IMapper mapper,
    UserService userService,
    EmailService emailService,
    TokenService tokenService
  )
  {
    _mapper = mapper;
    _userService = userService;
    _emailService = emailService;
    _tokenService = tokenService;
  }

  [MapToApiVersion("1.0")]
  [HttpPost("login")]
  [ProducesResponseType(typeof(AuthUserDto), StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> Login(UserAuthRequestDto authRequest)
  {
    var user = await _userService.LogUserInAsync(authRequest.Username, authRequest.Password);
    var authUser = _mapper.Map<AuthUserDto>(user);
    authUser.Token = "a jwt token";
    return Ok(authUser);
  }

  [MapToApiVersion("1.0")]
  [HttpPost("forgot-password")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> ForgotPassword(ForgotPasswordRequestDto forgotRequest)
  {
    var token = _tokenService.GenerateResetPasswordToken();
    var user = await _userService.SetUserPasswordResetToken(forgotRequest.Username, token);
    await _emailService.SendPasswordResetEmail(user.Email, token);
    return Ok();
  }

  [MapToApiVersion("1.0")]
  [HttpPost("reset-password")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> ResetPassword(ResetPasswordRequestDto resetRequest)
  {
    await _userService.UpdateUserPassword(resetRequest.Token, resetRequest.NewPassword);
    return Ok();
  }
}