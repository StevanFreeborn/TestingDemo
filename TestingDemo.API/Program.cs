var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<MongoDbSettings>(
  builder.Configuration.GetSection("MongoDbSettings")
);

builder.Services.AddSingleton(
  sp => sp.GetRequiredService<IOptions<MongoDbSettings>>().Value
);

builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddScoped<IUserRepository, MongoUserRepository>();

builder.Services.AddScoped<UserService>();

builder.Services.AddAutoMapper(
  config => config.AddProfile<MapperProfile>()
);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddApiVersioning(
  config =>
  {
    config.DefaultApiVersion = new ApiVersion(1, 0);
    config.AssumeDefaultVersionWhenUnspecified = true;
    config.ReportApiVersions = true;
    config.ApiVersionReader = new HeaderApiVersionReader("x-api-version");
  }
);

builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<ErrorHandling>();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
