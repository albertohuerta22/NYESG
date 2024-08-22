using NYShipping.Data;
using NYShipping.Models;
using System.Collections.Generic;
using System.Linq;

namespace NYShipping.Services
{
    public class WaterUsageService
    {
        private readonly NYShippingContext _context;

        public WaterUsageService(NYShippingContext context)
        {
            _context = context;
        }

        public IEnumerable<WaterUsage> GetAllWaterUsages()
        {
            return _context.WaterUsages.ToList();
        }

        public WaterUsage? GetWaterUsageById(int id)
        {
            return _context.WaterUsages.Find(id);
        }

        public void AddWaterUsage(WaterUsage waterUsage)
        {
            _context.WaterUsages.Add(waterUsage);
            _context.SaveChanges();
        }

        public void UpdateWaterUsage(WaterUsage waterUsage)
        {
            _context.WaterUsages.Update(waterUsage);
            _context.SaveChanges();
        }

        public void DeleteWaterUsage(int id)
        {
            var waterUsage = _context.WaterUsages.Find(id);
            if (waterUsage != null)
            {
                _context.WaterUsages.Remove(waterUsage);
                _context.SaveChanges();
            }
        }
    }
}
