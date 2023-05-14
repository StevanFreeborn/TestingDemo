namespace TestingDemo.Core.Interfaces;

public interface IUserRepository
{
  Task<User?> GetByIdAsync(string id);
  Task<User?> GetByUsernameAsync(string username);
  Task<User> CreateUserAsync(User user);
  Task<User?> UpdateUserAsync(User user);
  Task<User?> GetByResetToken(string token);
}