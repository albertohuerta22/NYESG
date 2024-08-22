using Microsoft.EntityFrameworkCore;
using NYShipping.Data;
using NYShipping.Services;
using NYShipping.Models;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<NYShippingContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 21))));

builder.Services.AddScoped<EnergyService>();
builder.Services.AddScoped<WaterUsageService>();
builder.Services.AddScoped<WasteDisposalService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Seed the database with JSON data
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<NYShippingContext>();

    // Clear existing data
    context.EnergyUsages.RemoveRange(context.EnergyUsages);
    context.WaterUsages.RemoveRange(context.WaterUsages);
    context.WasteDisposals.RemoveRange(context.WasteDisposals);
    context.SaveChanges();

    // Load Energy Usage data
    var energyData = File.ReadAllText(Path.Combine("Data", "EnergyUsage.json"));
    var energyUsages = JsonSerializer.Deserialize<List<EnergyUsage>>(energyData);

    if (energyUsages != null)
    {
        context.EnergyUsages.AddRange(energyUsages);
    }

    // Load Water Usage data
    var waterData = File.ReadAllText(Path.Combine("Data", "WaterUsage.json"));
    var waterUsages = JsonSerializer.Deserialize<List<WaterUsage>>(waterData);

    if (waterUsages != null)
    {
        context.WaterUsages.AddRange(waterUsages);
    }

    // Load Waste Disposal data
    var wasteData = File.ReadAllText(Path.Combine("Data", "WasteUsage.json"));
    var wasteDisposals = JsonSerializer.Deserialize<List<WasteDisposal>>(wasteData);

    if (wasteDisposals != null)
    {
        context.WasteDisposals.AddRange(wasteDisposals);
    }

    context.SaveChanges();
}

app.UseHttpsRedirection();

app.UseCors("AllowAllOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();
