using System;

namespace NYShipping.Models
{
    public class WaterUsage
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public double GallonsUsed { get; set; }
        public string? Location { get; set; }
    }
}
