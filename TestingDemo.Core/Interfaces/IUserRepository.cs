namespace TestingDemo.Core.Interfaces;

public interface IUserRepository
{
  Task<User> GetByIdAsync(string id);
  Task<User> CreateUserAsync(User user);
}