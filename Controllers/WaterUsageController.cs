using Microsoft.AspNetCore.Mvc;
using NYShipping.Models;
using NYShipping.Services;

namespace NYShipping.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterUsageController : ControllerBase
    {
        private readonly WaterUsageService _service;

        public WaterUsageController(WaterUsageService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<IEnumerable<WaterUsage>> GetAll()
        {
            return Ok(_service.GetAllWaterUsages());
        }

        [HttpGet("{id}")]
        public ActionResult<WaterUsage> GetById(int id)
        {
            var waterUsage = _service.GetWaterUsageById(id);
            if (waterUsage == null)
                return NotFound();

            return Ok(waterUsage);
        }

        [HttpPost]
        public ActionResult<WaterUsage> Create(WaterUsage waterUsage)
        {
            _service.AddWaterUsage(waterUsage);
            return CreatedAtAction(nameof(GetById), new { id = waterUsage.Id }, waterUsage);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, WaterUsage waterUsage)
        {
            if (id != waterUsage.Id)
                return BadRequest();

            var existing = _service.GetWaterUsageById(id);
            if (existing == null)
                return NotFound();

            _service.UpdateWaterUsage(waterUsage);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var waterUsage = _service.GetWaterUsageById(id);
            if (waterUsage == null)
                return NotFound();

            _service.DeleteWaterUsage(id);
            return NoContent();
        }
    }
}
