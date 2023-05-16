var builder = WebApplication.CreateBuilder(args);
builder.AddConfiguration();
builder.Services.AddCore();
builder.Services.AddInfrastructure();
builder.Services.AddAutoMapperAndProfiles();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAndConfigureAPIVersioning();
builder.Services.AddAndConfigureSwaggerGen();
builder.AddAndConfigureJWTAuth();

var app = builder.Build();
app.UseMiddleware<ErrorHandling>();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
