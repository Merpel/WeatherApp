using System;
using Microsoft.EntityFrameworkCore;

/// <summary>
/// Main context class that is used with communicating to a database.
/// </summary>
namespace WeatherApp.Models
{
    public class WeatherInfoContext : DbContext
    {
        public WeatherInfoContext(DbContextOptions<WeatherInfoContext> options) : base(options)
        {
        }

        public DbSet<WeatherInfo> WeatherInfos { get; set; }

        public DbSet<Location> Locations { get; set; }
    }
}
