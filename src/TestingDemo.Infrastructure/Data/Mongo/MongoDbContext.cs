namespace TestingDemo.Infrastructure.Data.Mongo;

public class MongoDbContext
{
  private const string UsersCollectionName = "users";
  private const string AuthTokensCollectionName = "authTokens";
  public IMongoCollection<User> Users { get; set; }
  public IMongoCollection<AuthToken> AuthTokens { get; set; }

  public MongoDbContext(MongoDbSettings settings)
  {
    ClassMapper.RegisterMappings();
    IMongoClient client = new MongoClient(settings.ConnectionString);
    IMongoDatabase database = client.GetDatabase(settings.DatabaseName);
    Users = database.GetCollection<User>(UsersCollectionName);
    AuthTokens = database.GetCollection<AuthToken>(AuthTokensCollectionName);
  }
}