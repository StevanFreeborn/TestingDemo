namespace TestingDemo.Core.Interfaces;

public interface IUserService
{
  Task<User> CreateUserAsync(User user);
  Task<User> GetUserByIdAsync(string id);
  Task<User> GetUserByUsernameAsync(string username);
  Task<User> LogUserInAsync(string username, string password);
  Task<User> UpdateUserPassword(string userId, string newPassword);
}