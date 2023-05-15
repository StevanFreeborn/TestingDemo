var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<MongoDbSettings>(
  builder.Configuration.GetSection("MongoDbSettings")
);

builder.Services.Configure<SendGridProviderSettings>(
  builder.Configuration.GetSection("SendGrid")
);

builder.Services.Configure<EmailSettings>(
  builder.Configuration.GetSection("Email")
);

builder.Services.Configure<JwtTokenSettings>(
  builder.Configuration.GetSection("JWT")
);

builder.Services.AddSingleton(
  sp => sp.GetRequiredService<IOptions<MongoDbSettings>>().Value
);

builder.Services.AddSingleton(
  sp => sp.GetRequiredService<IOptions<SendGridProviderSettings>>().Value
);

builder.Services.AddSingleton(
  sp => sp.GetRequiredService<IOptions<EmailSettings>>().Value
);

builder.Services.AddSingleton(
  sp => sp.GetRequiredService<IOptions<JwtTokenSettings>>().Value
);

builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddScoped<IUserRepository, MongoUserRepository>();
builder.Services.AddScoped<ITokenRepository, MongoTokenRepository>();

builder.Services.AddScoped<IEmailProvider, SendGridProvider>();

builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<EmailService>();
builder.Services.AddScoped<TokenService>();

builder.Services.AddAutoMapper(
  config => config.AddProfile<MapperProfile>()
);

builder.Services
.AddAuthentication(
  x =>
  {
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
  }
)
.AddJwtBearer(
  options => options.TokenValidationParameters = new TokenValidationParameters
  {
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(
      Encoding.UTF8.GetBytes(
        builder.Configuration.GetSection("JWT:Key").Value!
      )
    ),
    ValidIssuer = builder.Configuration.GetSection("JWT:Issuer").Value,
    ValidAudience = builder.Configuration.GetSection("JWT:Audience").Value,
  }
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

builder.Services.AddSwaggerGen(
  config =>
  {
    config.AddSecurityDefinition(
      "Bearer",
      new OpenApiSecurityScheme
      {
        Description = "JWT Authorization header using the Bearer scheme.",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
      }
    );
    config.OperationFilter<AuthorizeOperationFilter>();
  }
);

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
