using NYShipping.Data;
using NYShipping.Models;
using System.Collections.Generic;
using System.Linq;

namespace NYShipping.Services
{
    public class WasteDisposalService
    {
        private readonly NYShippingContext _context;

        public WasteDisposalService(NYShippingContext context)
        {
            _context = context;
        }

        public IEnumerable<WasteDisposal> GetAllWasteDisposals()
        {
            return _context.WasteDisposals.ToList();
        }

        public WasteDisposal? GetWasteDisposalById(int id)
        {
            return _context.WasteDisposals.Find(id);
        }

        public void AddWasteDisposal(WasteDisposal wasteDisposal)
        {
            _context.WasteDisposals.Add(wasteDisposal);
            _context.SaveChanges();
        }

        public void UpdateWasteDisposal(WasteDisposal wasteDisposal)
        {
            _context.WasteDisposals.Update(wasteDisposal);
            _context.SaveChanges();
        }

        public void DeleteWasteDisposal(int id)
        {
            var wasteDisposal = _context.WasteDisposals.Find(id);
            if (wasteDisposal != null)
            {
                _context.WasteDisposals.Remove(wasteDisposal);
                _context.SaveChanges();
            }
        }
    }
}
