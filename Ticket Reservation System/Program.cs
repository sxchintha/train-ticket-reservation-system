using Ticket_Reservation_System.Models;
using Ticket_Reservation_System.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Configure the database settings from the configuration file.
builder.Services.Configure<TrainDatabaseSetting>(
    builder.Configuration.GetSection("TicketDatabase"));

builder.Services.Configure<BookingDatabaseSetting>(
    builder.Configuration.GetSection("BookingDatabase"));

builder.Services.Configure<UserDatabaseSettings>(
    builder.Configuration.GetSection("UserDatabase"));

builder.Services.Configure<TravelAgentDatabaseSettings>(
    builder.Configuration.GetSection("TravelAgentDatabase"));

builder.Services.Configure<BackOfficeDatabaseSettings>(
    builder.Configuration.GetSection("BackOfficeDatabase"));

// Add the TrainService as a singleton to the service container.
builder.Services.AddSingleton<TrainService>();
builder.Services.AddControllers();

builder.Services.AddSingleton<BookingService>();
builder.Services.AddControllers();

builder.Services.AddSingleton<UserService>();
builder.Services.AddControllers();

builder.Services.AddSingleton<TravelAgentService>();
builder.Services.AddControllers();

builder.Services.AddSingleton<BackOfficeService>();
builder.Services.AddControllers();

// Set up CORS (Cross-Origin Resource Sharing) to allow requests from any origin, method, and header.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader());
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Apply the CORS policy named "AllowAll".
app.UseCors("AllowAll");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
