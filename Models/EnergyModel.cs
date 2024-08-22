using System;

namespace NYShipping.Models
{
    public class EnergyUsage
    {
        public int Id{ get; set; }
        public string? Month { get; set; }
        public double? ElectricityUsage { get; set; } // in kWh
        public double? GasUsage { get; set; } // in cubic meters
        public double WaterUsage { get; set; } // in cubic meters
        public DateTime DateRecorded { get; set; }
    }
}
