using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// A class that defines the structure of a weatherinfo object.
/// </summary>
namespace WeatherApp.Models
{
    public class WeatherInfo
    {
        [Key] 
        public long Id { get; set; }

        [Required]
        [Column(TypeName= "Date")]
        public DateTime Date { get; set; }

        [Required]
        [Column(TypeName = "Decimal (10,2)")]
        public double Temperature { get; set; }

        [Required]
        [Column(TypeName = "Decimal (10,2)")]
        public double Wind { get; set; }

        [Required]
        [Column(TypeName = "Decimal (10,2)")]
        public double Rain { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string Place { get; set; }
    }
}
