namespace TestingDemo.UnitTests.Core.Services;

public class UserServiceTests
{
  private readonly Mock<IUserRepository> _userRepositoryMock;
  private readonly Mock<IAuthenticator> _authenticatorMock;

  private readonly UserService _userService;

  public UserServiceTests()
  {
    _userRepositoryMock = new Mock<IUserRepository>();
    _authenticatorMock = new Mock<IAuthenticator>();
    _userService = new UserService(
      _userRepositoryMock.Object,
      _authenticatorMock.Object
    );
  }

  [Fact]
  public async Task GetUserByIdAsync_WhenCalledAndUserIsNotFound_ItShouldThrowAModelNotFoundException()
  {
    _userRepositoryMock.Setup(
      m => m.GetByIdAsync(It.IsAny<string>())
    )
    .ReturnsAsync((User?) null);

    var action = () => _userService.GetUserByIdAsync("id");

    await action.Should().ThrowAsync<ModelNotFoundException>();
  }

  [Fact]
  public async Task GetUserByIdAsync_WhenCalledAndUserIsFound_ItShouldReturnTheUser()
  {
    var user = new User();

    _userRepositoryMock.Setup(
      m => m.GetByIdAsync(It.IsAny<string>())
    )
    .ReturnsAsync(user);

    var result = await _userService.GetUserByIdAsync(user.Id);

    result.Should().NotBeNull();
    result.Should().Be(user);
  }

  [Fact]
  public async Task LogUserInAsync_WhenCalledAndUserIsNotFound_ItShouldThrowAnInvalidLoginException()
  {
    _userRepositoryMock.Setup(
      m => m.GetByUsernameAsync(It.IsAny<string>())
    )
    .ReturnsAsync((User?) null);

    var action = () => _userService.LogUserInAsync("username", "password");

    await action.Should().ThrowAsync<InvalidLoginException>();
  }

  [Fact]
  public async Task LogUserInAsync_WhenCalledUserIsFoundButPasswordIsIncorrect_ItShouldThrowAnInvalidLoginException()
  {
    var user = new User();

    _userRepositoryMock.Setup(
      m => m.GetByUsernameAsync(It.IsAny<string>())
    )
    .ReturnsAsync(user);

    _authenticatorMock.Setup(
      m => m.VerifyPassword(
        It.IsAny<string>(),
        It.IsAny<string>(),
        It.IsAny<string>()
      )
    )
    .Returns(false);

    var action = () => _userService.LogUserInAsync(
      user.Username,
      user.Password
    );

    await action.Should().ThrowAsync<InvalidLoginException>();
  }

  [Fact]
  public async Task LogUserInAsync_WhenCalledUserIsFoundAndPasswordIsCorrect_ItShouldReturnUser()
  {
    var user = new User();

    _userRepositoryMock.Setup(
      m => m.GetByUsernameAsync(It.IsAny<string>())
    )
    .ReturnsAsync(user);

    _authenticatorMock.Setup(
      m => m.VerifyPassword(
        It.IsAny<string>(),
        It.IsAny<string>(),
        It.IsAny<string>()
      )
    )
    .Returns(true);

    var result = await _userService.LogUserInAsync(
      user.Username,
      user.Password
    );

    result.Should().Be(user);
  }

  [Fact]
  public async Task CreateUserAsync_WhenCalledAndAUserAlreadyExistsWithTheSameUsername_ItShouldThrowAModelAlreadyExistsException()
  {
    var existingUser = new User();

    _userRepositoryMock.Setup(
      m => m.GetByUsernameAsync(It.IsAny<string>())
    )
    .ReturnsAsync(existingUser);

    var action = () => _userService.CreateUserAsync(new User());

    await action.Should().ThrowAsync<ModelAlreadyExistsException>();
  }

  [Fact]
  public async Task CreateUserAsync_WhenCalledAndAUserDoesNotAlreadyExistWithTheSameUsername_ItShouldGenerateASaltForUserHashTheUsersPasswordAndCreateNewUser()
  {
    var originalPassword = "Password";
    var newUser = new User
    {
      Username = "Username",
      Password = originalPassword,
    };

    var salt = "salt";
    var hashedPassword = "hashedPassword";

    _userRepositoryMock.Setup(
      m => m.GetByUsernameAsync(It.IsAny<string>())
    )
    .ReturnsAsync((User?) null);

    _authenticatorMock.Setup(
      m => m.GenerateRandomSalt()
    )
    .Returns(salt);

    _authenticatorMock.Setup(
      m => m.HashPassword(newUser.Password, salt)
    )
    .Returns(hashedPassword);

    var result = await _userService.CreateUserAsync(newUser);

    result.Should().NotBeNull();
    result.Password.Should().Be(hashedPassword);
    result.Password.Should().NotBe(originalPassword);
    result.Salt.Should().Be(salt);

    _userRepositoryMock.Verify(
      m => m.CreateUserAsync(newUser),
      Times.Once()
    );
  }

  [Fact]
  public async Task GetUserByUsernameAsync_WhenCalledAndUserIsNotFound_ItShouldThrowAModelNotFoundException()
  {
    _userRepositoryMock.Setup(
      m => m.GetByUsernameAsync(It.IsAny<string>())
    )
    .ReturnsAsync((User?) null);

    var action = () => _userService.GetUserByUsernameAsync("id");

    await action.Should().ThrowAsync<ModelNotFoundException>();
  }

  [Fact]
  public async Task GetUserByUsernameAsync_WhenCalledAndUserIsFound_ItShouldReturnTheUser()
  {
    var existingUser = new User();

    _userRepositoryMock.Setup(
      m => m.GetByUsernameAsync(It.IsAny<string>())
    )
    .ReturnsAsync(existingUser);

    var result = await _userService.GetUserByUsernameAsync(existingUser.Username);

    result.Should().Be(existingUser);
  }
}