using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// A class that defines the structure for a location object.
/// </summary>
namespace WeatherApp.Models
{
    public class Location
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string Place { get; set; }
    }
}
