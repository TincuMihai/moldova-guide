using MoldovaGuide.BusinessLayer.Interfaces;
using MoldovaGuide.Domain.Models.Event;
using Microsoft.AspNetCore.Mvc;

namespace MoldovaGuide.Api.Controller
{
    [Route("api/events")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private IEventAction _event;
        public EventController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _event = bl.EventAction();
        }

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            try { return Ok(_event.GetAllEventsAction()); }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare la obținerea evenimentelor: " + ex.Message }); }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if (id <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul evenimentului trebuie să fie pozitiv." });

            try
            {
                var e = _event.GetEventByIdAction(id);
                if (e == null)
                    return NotFound(new { IsSuccess = false, Message = $"Evenimentul cu ID={id} nu a fost găsit." });
                return Ok(e);
            }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare internă: " + ex.Message }); }
        }

        [HttpPost]
        public IActionResult Create([FromBody] EventCreateDto data)
        {
            if (data == null)
                return BadRequest(new { IsSuccess = false, Message = "Datele evenimentului sunt obligatorii." });

            if (string.IsNullOrWhiteSpace(data.Title))
                return BadRequest(new { IsSuccess = false, Message = "Titlul evenimentului este obligatoriu." });

            if (string.IsNullOrWhiteSpace(data.Date))
                return BadRequest(new { IsSuccess = false, Message = "Data evenimentului este obligatorie." });

            if (string.IsNullOrWhiteSpace(data.Venue))
                return BadRequest(new { IsSuccess = false, Message = "Locația evenimentului este obligatorie." });

            try
            {
                var result = _event.CreateEventAction(data);
                return Created("/api/events", result); // 201
            }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare la crearea evenimentului: " + ex.Message }); }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] EventCreateDto data)
        {
            if (id <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul evenimentului trebuie să fie pozitiv." });

            if (data == null)
                return BadRequest(new { IsSuccess = false, Message = "Datele evenimentului sunt obligatorii." });

            try
            {
                var result = _event.UpdateEventAction(id, data);
                if (!result.IsSuccess) return NotFound(result);
                return Ok(result);
            }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare la actualizarea evenimentului: " + ex.Message }); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul evenimentului trebuie să fie pozitiv." });

            try
            {
                var result = _event.DeleteEventAction(id);
                if (!result.IsSuccess) return NotFound(result);
                return Ok(result);
            }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare la ștergerea evenimentului: " + ex.Message }); }
        }
    }
}
