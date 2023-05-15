namespace TestingDemo.API.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("/api/auth")]
[Produces("application/json")]
public class AuthController : ControllerBase
{
  private const string RefreshTokenName = "refreshToken";
  private readonly IMapper _mapper;
  private readonly JwtTokenSettings _jwtTokenSettings;
  private readonly UserService _userService;
  private readonly EmailService _emailService;
  private readonly TokenService _tokenService;

  public AuthController(
    IMapper mapper,
    JwtTokenSettings jwtTokenSettings,
    UserService userService,
    EmailService emailService,
    TokenService tokenService
  )
  {
    _mapper = mapper;
    _jwtTokenSettings = jwtTokenSettings;
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
    var authUser = GetAuthUserResponse(user);
    var refreshToken = await _tokenService.CreateRefreshTokenForUser(user);
    SetRefreshCookie(Response, refreshToken);
    return Ok(authUser);
  }

  [Authorize]
  [MapToApiVersion("1.0")]
  [HttpGet("refresh-token")]
  [ProducesResponseType(typeof(AuthUserDto), StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> RefreshToken()
  {
    var userId = HttpContext.User.Identity!.Name!;
    var refreshToken = Request.Cookies[RefreshTokenName];
    var authRefreshToken = await _tokenService.VerifyAndGetRefreshToken(refreshToken, userId);
    await _tokenService.RevokeToken(authRefreshToken);
    await _tokenService.RemoveExpiredAndRevokedRefreshTokensForUser(userId);

    var user = await _userService.GetUserByIdAsync(userId);
    var authUser = GetAuthUserResponse(user);

    var newRefreshToken = await _tokenService.CreateRefreshTokenForUser(user);
    SetRefreshCookie(Response, newRefreshToken);

    return Ok(authUser);
  }

  [MapToApiVersion("1.0")]
  [HttpPost("forgot-password")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> ForgotPassword(ForgotPasswordRequestDto forgotRequest)
  {
    var user = await _userService.GetUserByUsernameAsync(forgotRequest.Username);
    var resetPasswordToken = await _tokenService.CreateResetPasswordTokenForUser(user);
    await _emailService.SendPasswordResetEmail(user.Email, resetPasswordToken.Token);
    return Ok();
  }

  [MapToApiVersion("1.0")]
  [HttpPost("reset-password")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> ResetPassword(ResetPasswordRequestDto resetRequest)
  {
    var authToken = await _tokenService.GetPasswordResetToken(resetRequest.Token);
    var updatedUser = await _userService.UpdateUserPassword(authToken.UserId, resetRequest.NewPassword);
    await _tokenService.RevokeToken(authToken);
    await _tokenService.RemoveExpiredAndRevokedPasswordResetTokensForUser(updatedUser.Id);
    return Ok();
  }

  private static void SetRefreshCookie(HttpResponse res, AuthToken refreshToken)
  {
    res.Cookies.Append(
      RefreshTokenName,
      refreshToken.Token,
      new CookieOptions { HttpOnly = true, SameSite = SameSiteMode.Strict }
    );
  }

  private AuthUserDto GetAuthUserResponse(User user)
  {
    var authUser = _mapper.Map<AuthUserDto>(user);
    var (jwtExpiration, jwtToken) = GenerateUserJWT(user);

    authUser.Token = jwtToken;
    authUser.ExpiresIn = (int) jwtExpiration.Subtract(DateTime.UtcNow).TotalMilliseconds;

    return authUser;
  }

  private (DateTime expiration, string jwtToken) GenerateUserJWT(User user)
  {
    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.UTF8.GetBytes(_jwtTokenSettings.Key);
    var issueAt = DateTime.UtcNow;
    var expires = issueAt.AddMinutes(_jwtTokenSettings.TokenLifetimeMinutes);
    var claims = new List<Claim>
    {
      new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
      new (JwtRegisteredClaimNames.UniqueName, user.Id),
      new (JwtRegisteredClaimNames.NameId, user.Username),
      new (JwtRegisteredClaimNames.Email, user.Email),
    };

    var tokenDescriptor = new SecurityTokenDescriptor
    {
      Subject = new ClaimsIdentity(claims),
      Expires = expires,
      IssuedAt = issueAt,
      Issuer = _jwtTokenSettings.Issuer,
      Audience = _jwtTokenSettings.Audience,
      SigningCredentials = new SigningCredentials(
        new SymmetricSecurityKey(key),
        SecurityAlgorithms.HmacSha256Signature
      )
    };

    var securityToken = tokenHandler.CreateToken(tokenDescriptor);
    var jwtToken = tokenHandler.WriteToken(securityToken);
    return (expires, jwtToken);
  }
}