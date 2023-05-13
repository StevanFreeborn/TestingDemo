namespace TestingDemo.Infrastructure.Data.Mongo.Repositories;

public class MongoUserRepository : IUserRepository
{
  private readonly MongoDbContext _context;
  public MongoUserRepository(MongoDbContext context)
  {
    _context = context;
  }

  public async Task<User> GetByIdAsync(string id)
  {
    return await _context.Users.Find(u => u.Id == id).FirstOrDefaultAsync();
  }

  public async Task<User> CreateUserAsync(User user)
  {
    await _context.Users.InsertOneAsync(user);
    return user;
  }
}