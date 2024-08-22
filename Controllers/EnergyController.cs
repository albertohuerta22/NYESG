using Microsoft.AspNetCore.Mvc;
using NYShipping.Models;
using NYShipping.Services;

namespace NYShipping.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnergyController : ControllerBase
    {
        private readonly EnergyService _service;

        public EnergyController(EnergyService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<IEnumerable<EnergyUsage>> GetAll()
        {
            return Ok(_service.GetAllEnergyUsages());
        }

        [HttpGet("{id}")]
        public ActionResult<EnergyUsage> GetById(int id)
        {
            var energyUsage = _service.GetEnergyUsageById(id);
            if (energyUsage == null)
                return NotFound();

            return Ok(energyUsage);
        }

        [HttpPost]
        public ActionResult<EnergyUsage> Create(EnergyUsage energyUsage)
        {
            _service.AddEnergyUsage(energyUsage);
            return CreatedAtAction(nameof(GetById), new { id = energyUsage.Id }, energyUsage);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, EnergyUsage energyUsage)
        {
            if (id != energyUsage.Id)
                return BadRequest();

            var existing = _service.GetEnergyUsageById(id);
            if (existing == null)
                return NotFound();

            _service.UpdateEnergyUsage(energyUsage);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var energyUsage = _service.GetEnergyUsageById(id);
            if (energyUsage == null)
                return NotFound();

            _service.DeleteEnergyUsage(id);
            return NoContent();
        }
    }
}
