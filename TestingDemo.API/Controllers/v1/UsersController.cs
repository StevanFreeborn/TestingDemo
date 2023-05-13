namespace TestingDemo.API.Controllers.V1;

[ApiController]
[ApiVersion("1.0")]
[Route("/api/users")]
[Produces("application/json")]
public class UsersController : ControllerBase
{
  private readonly UserService _userService;
  private readonly IMapper _mapper;

  public UsersController(UserService userService, IMapper mapper)
  {
    _userService = userService;
    _mapper = mapper;
  }

  [MapToApiVersion("1.0")]
  [HttpGet("{id}")]
  [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> GetUserByIdAsync(string id)
  {
    if (!ObjectId.TryParse(id, out _))
    {
      throw new ValidationException($"{id} is not a valid user id");
    }

    var user = await _userService.GetUserByIdAsync(id);
    var userDto = _mapper.Map<UserDto>(user);
    return Ok(userDto);
  }

  [MapToApiVersion("1.0")]
  [HttpPost]
  [ProducesResponseType(typeof(CreatedResult), StatusCodes.Status201Created)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> CreateUserAsync(NewUserDto user)
  {
    var newUser = _mapper.Map<User>(user);
    var createdUser = await _userService.CreateUserAsync(newUser);
    var userDto = _mapper.Map<UserDto>(createdUser);
    return Created($"/api/users/{createdUser.Id}", userDto);
  }
}