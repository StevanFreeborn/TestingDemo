namespace TestingDemo.UnitTests.Core.Services;

public class UserServiceTests
{
  private readonly Mock<IUserRepository> _userRepositoryMock;
  private readonly UserService _userService;

  public UserServiceTests()
  {
    _userRepositoryMock = new Mock<IUserRepository>();
    _userService = new UserService(_userRepositoryMock.Object);
  }
}