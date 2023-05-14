namespace TestingDemo.Core.Services;

public class UserService
{
  private readonly IUserRepository _userRepository;
  public UserService(IUserRepository userRepository)
  {
    _userRepository = userRepository;
  }

  public async Task<User> GetUserByIdAsync(string id)
  {
    var user = await _userRepository.GetByIdAsync(id);

    if (user == null)
    {
      throw new ModelNotFoundException($"No user with id {id} found");
    }

    return user;
  }

  public async Task<User> LogUserInAsync(string username, string password)
  {
    var user = await _userRepository.GetByUsernameAsync(username);

    if (user == null)
    {
      throw new InvalidLoginException();
    }

    var isCorrectPassword = Authenticator.VerifyPassword(password, user.Password, user.Salt);

    if (isCorrectPassword == false)
    {
      throw new InvalidLoginException();
    }

    return user;
  }

  public async Task<User> CreateUserAsync(User user)
  {
    var existingUser = await _userRepository.GetByUsernameAsync(user.Username);

    if (existingUser != null)
    {
      throw new ModelAlreadyExistsException($"A user with the user name {user.Username} already exists");
    }

    var userSalt = Authenticator.GenerateRandomSalt();
    var hashedPassword = Authenticator.HashPassword(user.Password, userSalt);

    user.Password = hashedPassword;
    user.Salt = userSalt;

    await _userRepository.CreateUserAsync(user);
    return user;
  }

  public async Task<User> SetUserPasswordResetToken(string username, string token)
  {
    var existingUser = await _userRepository.GetByUsernameAsync(username);

    if (existingUser == null)
    {
      throw new InvalidForgotPasswordRequestException();
    }

    existingUser.PasswordResetToken = token;
    existingUser.PasswordResetTokenExpiration = DateTime.UtcNow.AddMinutes(15);

    var updatedUser = await _userRepository.UpdateUserAsync(existingUser);

    if (updatedUser == null)
    {
      throw new ModelNotUpdatedException($"Unable to update user {username} with reset token");
    }

    return updatedUser;
  }

  public async Task UpdateUserPassword(string token, string newPassword)
  {
    var existingUser = await _userRepository.GetByResetToken(token);

    if (existingUser == null || existingUser.PasswordResetTokenExpiration < DateTime.UtcNow)
    {
      throw new InvalidResetPasswordTokenException();
    }

    var newPasswordHash = Authenticator.HashPassword(newPassword, existingUser.Salt);

    existingUser.Password = newPasswordHash;
    existingUser.PasswordResetToken = null;
    existingUser.PasswordResetTokenExpiration = null;

    var updatedUser = await _userRepository.UpdateUserAsync(existingUser);

    if (updatedUser != null)
    {
      return;
    }

    throw new ModelNotUpdatedException($"Unable to update user {existingUser.Username}'s password");
  }
}