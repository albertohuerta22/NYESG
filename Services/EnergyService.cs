using NYShipping.Data;
using NYShipping.Models;
using System.Collections.Generic;
using System.Linq;

namespace NYShipping.Services
{
    public class EnergyService
    {
        private readonly NYShippingContext _context;

        public EnergyService(NYShippingContext context)
        {
            _context = context;
        }

        public IEnumerable<EnergyUsage> GetAllEnergyUsages()
        {
            return _context.EnergyUsages.ToList();
        }

        public EnergyUsage? GetEnergyUsageById(int id)
        {
            return _context.EnergyUsages.Find(id);
        }

        public void AddEnergyUsage(EnergyUsage energyUsage)
        {
            _context.EnergyUsages.Add(energyUsage);
            _context.SaveChanges();
        }

        public void UpdateEnergyUsage(EnergyUsage energyUsage)
        {
            _context.EnergyUsages.Update(energyUsage);
            _context.SaveChanges();
        }

        public void DeleteEnergyUsage(int id)
        {
            var energyUsage = _context.EnergyUsages.Find(id);
            if (energyUsage != null)
            {
                _context.EnergyUsages.Remove(energyUsage);
                _context.SaveChanges();
            }
        }
    }
}
