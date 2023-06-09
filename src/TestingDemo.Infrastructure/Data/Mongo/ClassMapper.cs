namespace TestingDemo.Infrastructure.Data.Mongo;

public static class ClassMapper
{
  public static void RegisterMappings()
  {
    BsonClassMap.RegisterClassMap<User>(
      cm =>
      {
        cm.AutoMap();
        cm.MapIdProperty(u => u.Id).SetIdGenerator(StringObjectIdGenerator.Instance);
        cm.MapProperty(u => u.Username).SetElementName("username");
        cm.MapProperty(u => u.Email).SetElementName("email");
        cm.MapProperty(u => u.Password).SetElementName("password");
        cm.MapProperty(u => u.Salt).SetElementName("salt");
        cm.MapProperty(u => u.CreatedAt).SetElementName("createdAt");
        cm.MapProperty(u => u.UpdatedAt).SetElementName("updatedAt");
      }
    );
    BsonClassMap.RegisterClassMap<AuthToken>(
      cm =>
      {
        cm.AutoMap();
        cm.MapIdProperty(u => u.Id).SetIdGenerator(StringObjectIdGenerator.Instance);
        cm.MapProperty(u => u.Token).SetElementName("token");
        cm.MapProperty(u => u.UserId).SetElementName("userId");
        cm.MapProperty(u => u.ExpiresAt).SetElementName("expiresAt");
        cm.MapProperty(u => u.Revoked).SetElementName("revoked");
        cm.MapProperty(u => u.CreatedAt).SetElementName("createdAt");
        cm.MapProperty(u => u.UpdatedAt).SetElementName("updatedAt");
      }
    );
  }
}