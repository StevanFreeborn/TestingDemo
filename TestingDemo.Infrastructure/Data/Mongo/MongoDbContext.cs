namespace TestingDemo.Infrastructure.Data.Mongo;

public class MongoDbContext
{
  private const string UsersCollectionName = "users";
  public IMongoCollection<User> Users { get; set; }
  public MongoDbContext(MongoDbSettings settings)
  {
    ClassMapper.RegisterMappings();
    IMongoClient client = new MongoClient(settings.ConnectionString);
    IMongoDatabase database = client.GetDatabase(settings.DatabaseName);
    Users = database.GetCollection<User>(UsersCollectionName);
  }
}