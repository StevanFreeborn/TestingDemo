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
builder.Services.AddCors(
  options => options.AddPolicy(
    "development",
    policy => policy
    .AllowCredentials()
    .AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins("http://localhost:5001")
  )
);

var app = builder.Build();
app.UseMiddleware<ErrorHandling>();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
  app.UseCors("development");
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
