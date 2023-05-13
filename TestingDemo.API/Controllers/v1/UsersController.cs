namespace TestingDemo.API.Controllers.v1;

[ApiController]
[ApiVersion("1.0")]
[Route("/api/users")]
[Produces("application/json")]
public class UsersController : ControllerBase
{
  private readonly IUserRepository _userRepository;
  private readonly IMapper _mapper;

  public UsersController(IUserRepository userRepository, IMapper mapper)
  {
    _userRepository = userRepository;
    _mapper = mapper;
  }

  [MapToApiVersion("1.0")]
  [HttpGet("{id}")]
  [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
  [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> GetUserByIdAsync(string id)
  {

    if (!ObjectId.TryParse(id, out _))
    {
      ModelState.AddModelError(nameof(id), $"{id} is not a valid id");
      return ValidationProblem(detail: "Invalid request");
    }

    try
    {
      var user = await _userRepository.GetByIdAsync(id);

      return user == null
      ? Problem(detail: $"Could not find user {id}", statusCode: 404)
      : Ok(user);
    }
    catch (Exception e)
    {
      Console.WriteLine(e);
      return Problem(detail: "Failed to get user", statusCode: 500);
    }
  }

  [MapToApiVersion("1.0")]
  [HttpPost]
  public async Task<IActionResult> CreateUserAsync(UserDto user)
  {
    try
    {
      var newUser = _mapper.Map<User>(user);
      var createdUser = await _userRepository.CreateUserAsync(newUser);
      var userDto = _mapper.Map<UserDto>(createdUser);
      return Created($"/api/users/{createdUser.Id}", userDto);
    }
    catch (Exception e)
    {
      Console.WriteLine(e);
      return Problem(detail: "Failed to create user", statusCode: 500);
    }
  }
}