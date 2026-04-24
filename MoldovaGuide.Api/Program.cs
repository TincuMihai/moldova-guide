var builder = WebApplication.CreateBuilder(args);

MoldovaGuide.DataAccess.DbSession.ConnectionString =
    builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// ═══ SEED: Admin account ═══
using (var db = new MoldovaGuide.DataAccess.Context.UserContext())
{
    db.Database.EnsureCreated();
    if (!db.Users.Any(u => u.Role == MoldovaGuide.Domain.Entities.User.UserRole.Admin))
    {
        db.Users.Add(new MoldovaGuide.Domain.Entities.User.UserData
        {
            Name = "Admin MoldovaGuide",
            Email = "admin@moldovaguide.md",
            Password = "Admin2025!",
            Avatar = "https://ui-avatars.com/api/?name=Admin+MoldovaGuide&background=1e293b&color=fff&size=150",
            Phone = "+373 22 000 000",
            Bio = "Administrator principal al platformei MoldovaGuide.",
            Languages = "Română, Engleză, Rusă",
            Role = MoldovaGuide.Domain.Entities.User.UserRole.Admin,
            IsBlocked = false,
            RegisteredOn = DateTime.Now
        });
        db.SaveChanges();
        Console.WriteLine("✅ Admin account seeded: admin@moldovaguide.md / Admin2025!");
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
