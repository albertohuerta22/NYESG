using Microsoft.AspNetCore.Mvc;
using NYShipping.Models;
using NYShipping.Services;

namespace NYShipping.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WasteDisposalController : ControllerBase
    {
        private readonly WasteDisposalService _service;

        public WasteDisposalController(WasteDisposalService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<IEnumerable<WasteDisposal>> GetAll()
        {
            return Ok(_service.GetAllWasteDisposals());
        }

        [HttpGet("{id}")]
        public ActionResult<WasteDisposal> GetById(int id)
        {
            var wasteDisposal = _service.GetWasteDisposalById(id);
            if (wasteDisposal == null)
                return NotFound();

            return Ok(wasteDisposal);
        }

        [HttpPost]
        public ActionResult<WasteDisposal> Create(WasteDisposal wasteDisposal)
        {
            _service.AddWasteDisposal(wasteDisposal);
            return CreatedAtAction(nameof(GetById), new { id = wasteDisposal.Id }, wasteDisposal);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, WasteDisposal wasteDisposal)
        {
            if (id != wasteDisposal.Id)
                return BadRequest();

            var existing = _service.GetWasteDisposalById(id);
            if (existing == null)
                return NotFound();

            _service.UpdateWasteDisposal(wasteDisposal);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var wasteDisposal = _service.GetWasteDisposalById(id);
            if (wasteDisposal == null)
                return NotFound();

            _service.DeleteWasteDisposal(id);
            return NoContent();
        }
    }
}
