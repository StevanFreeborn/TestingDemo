namespace TestingDemo.Infrastructure.Data.Mongo.Repositories;

public class MongoUserRepository : IUserRepository
{
  private readonly MongoDbContext _context;
  public MongoUserRepository(MongoDbContext context)
  {
    _context = context;
  }

  public async Task<User?> GetByIdAsync(string id)
  {
    return await _context.Users.Find(u => u.Id == id).FirstOrDefaultAsync();
  }

  public async Task<User> CreateUserAsync(User user)
  {
    await _context.Users.InsertOneAsync(user);
    return user;
  }

  public async Task<User?> GetByUsernameAsync(string username)
  {
    return await _context.Users.Find(u => u.Username == username).FirstOrDefaultAsync();
  }

  public async Task<User?> UpdateUserAsync(User updatedUser)
  {
    var filter = Builders<User>.Filter.Eq(x => x.Id, updatedUser.Id);
    var options = new FindOneAndReplaceOptions<User, User>
    {
      ReturnDocument = ReturnDocument.After
    };

    updatedUser.UpdatedAt = DateTime.UtcNow;

    return await _context.Users.FindOneAndReplaceAsync(filter, updatedUser, options);
  }

  public async Task<User?> GetByResetToken(string token)
  {
    return await _context.Users.Find(u => u.PasswordResetToken == token).FirstOrDefaultAsync();
  }
}