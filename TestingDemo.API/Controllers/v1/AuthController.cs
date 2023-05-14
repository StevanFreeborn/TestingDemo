namespace TestingDemo.API.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("/api/auth")]
[Produces("application/json")]
public class AuthController : ControllerBase
{
  private readonly UserService _userService;
  private readonly IMapper _mapper;
  public AuthController(UserService userService, IMapper mapper)
  {
    _userService = userService;
    _mapper = mapper;
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
}