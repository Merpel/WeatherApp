using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeatherApp.Models;
using Microsoft.Extensions.Logging;


/// <summary>
/// Controller that will handle all the HTTP actions of the application.
/// </summary>
namespace WeatherApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherInfosController : ControllerBase
    {

        private readonly WeatherInfoContext _context;
        private readonly ILogger<WeatherInfosController> _logger;

        public WeatherInfosController(WeatherInfoContext context, ILogger<WeatherInfosController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // METHODS FOR api/WeatherInfos

        // GET: api/WeatherInfos
        public async Task<ActionResult<IEnumerable<WeatherInfo>>> GetWeatherInfos()
        {
            return await _context.WeatherInfos.ToListAsync();
        }

        // GET: api/WeatherInfos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WeatherInfo>> GetWeatherInfo(long id)
        {
            var weatherInfo = await _context.WeatherInfos.FindAsync(id);

            if (weatherInfo == null)
            {
                return NotFound();
            }

            return weatherInfo;
        }

        // PUT: api/WeatherInfos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWeatherInfo(long id, WeatherInfo weatherInfo)
        {
            if (id != weatherInfo.Id)
            {
                return BadRequest();
            }

            _context.Entry(weatherInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WeatherInfoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/WeatherInfos
        [HttpPost]
        public async Task<ActionResult<WeatherInfo>> PostWeatherInfo(WeatherInfo weatherInfo)
        {
            _context.WeatherInfos.Add(weatherInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWeatherInfo", new { id = weatherInfo.Id }, weatherInfo);
        }

        // DELETE: api/WeatherInfos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WeatherInfo>> DeleteWeatherInfo(long id)
        {
            var weatherInfo = await _context.WeatherInfos.FindAsync(id);
            if (weatherInfo == null)
            {
                return NotFound();
            }

            _context.WeatherInfos.Remove(weatherInfo);
            await _context.SaveChangesAsync();

            return weatherInfo;
        }

        //METHODS FOR api/WeatherInfos/Locations

        // GET: api/WeatherInfos/Locations
        [HttpGet("Locations")]
        public async Task<ActionResult<IEnumerable<Location>>> GetLocations()
        {
            return await _context.Locations.ToListAsync();
        }

        // GET: api/WeatherInfos/Locations/5
        [HttpGet("Locations/{id}")]
        public async Task<ActionResult<Location>> GetLocation(long id)
        {
            var location = await _context.Locations.FindAsync(id);

            if (location == null)
            {
                return NotFound();
            }

            return location;
        }

        // PUT: api/WeatherInfos/Locations/5
        [HttpPut("Locations/{id}")]
        public async Task<IActionResult> PutLocation(long id, Location location)
        {
            if (id != location.Id)
            {
                return BadRequest();
            }

            _context.Entry(location).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/WeatherInfos/Locations
        [HttpPost("Locations")]
        public async Task<ActionResult<Location>> PostLocation(Location location)
        {
            _context.Locations.Add(location);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLocation", new { id = location.Id }, location);
        }

        // DELETE: api/WeatherInfos/Locations/5
        [HttpDelete("Locations/{id}")]
        public async Task<ActionResult<Location>> DeleteLocation(long id)
        {
            var location = await _context.Locations.FindAsync(id);
            if (location == null)
            {
                return NotFound();
            }

            _context.Locations.Remove(location);
            await _context.SaveChangesAsync();

            return location;
        }


        // These methods check if weatherinfo and location exists in the database.
        private bool WeatherInfoExists(long id)
        {
            return _context.WeatherInfos.Any(e => e.Id == id);
        }

        private bool LocationExists(long id)
        {
            return _context.Locations.Any(e => e.Id == id);
        }

    }
}
