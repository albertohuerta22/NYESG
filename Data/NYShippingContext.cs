using Microsoft.EntityFrameworkCore;
using NYShipping.Models;

namespace NYShipping.Data
{
    public class NYShippingContext : DbContext
    {
        public NYShippingContext(DbContextOptions<NYShippingContext> options) : base(options) { }

        public DbSet<EnergyUsage> EnergyUsages { get; set; }
        public DbSet<WaterUsage> WaterUsages { get; set; }
        public DbSet<WasteDisposal> WasteDisposals { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // You can add custom configurations here if needed
            modelBuilder.Entity<EnergyUsage>().ToTable("EnergyUsages");
            modelBuilder.Entity<WaterUsage>().ToTable("WaterUsages");
            modelBuilder.Entity<WasteDisposal>().ToTable("WasteDisposals");

            // Configure other properties as needed
            // For example: modelBuilder.Entity<EnergyUsage>().Property(e => e.SomeProperty).IsRequired();
        }
    }
}
