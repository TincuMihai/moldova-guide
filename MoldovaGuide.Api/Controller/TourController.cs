using MoldovaGuide.BusinessLayer.Interfaces;
using MoldovaGuide.Domain.Models.Tour;
using Microsoft.AspNetCore.Mvc;

namespace MoldovaGuide.Api.Controller
{
    [Route("api/tours")]
    [ApiController]
    public class TourController : ControllerBase
    {
        private ITourAction _tour;
        public TourController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _tour = bl.TourAction();
        }

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            try { return Ok(_tour.GetAllToursAction()); }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare la obținerea tururilor: " + ex.Message }); }
        }

        [HttpGet("{slug}")]
        public IActionResult GetBySlug(string slug)
        {
            if (string.IsNullOrWhiteSpace(slug))
                return BadRequest(new { IsSuccess = false, Message = "Slug-ul turului este obligatoriu." });

            try
            {
                var tour = _tour.GetTourBySlugAction(slug);
                if (tour == null)
                    return NotFound(new { IsSuccess = false, Message = $"Turul '{slug}' nu a fost găsit." });
                return Ok(tour);
            }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare internă: " + ex.Message }); }
        }

        [HttpGet("guide/{guideId}")]
        public IActionResult GetByGuide(int guideId)
        {
            if (guideId <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul ghidului trebuie să fie pozitiv." });

            try { return Ok(_tour.GetToursByGuideAction(guideId)); }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare internă: " + ex.Message }); }
        }

        [HttpPost("{guideId}")]
        public IActionResult Create(int guideId, [FromBody] TourCreateDto data)
        {
            if (guideId <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul ghidului trebuie să fie pozitiv." });

            if (data == null)
                return BadRequest(new { IsSuccess = false, Message = "Datele turului sunt obligatorii." });

            if (string.IsNullOrWhiteSpace(data.Title))
                return BadRequest(new { IsSuccess = false, Message = "Titlul turului este obligatoriu." });

            if (data.Title.Length < 3)
                return BadRequest(new { IsSuccess = false, Message = "Titlul trebuie să conțină minim 3 caractere." });

            if (data.Price < 0)
                return BadRequest(new { IsSuccess = false, Message = "Prețul nu poate fi negativ." });

            if (data.MaxParticipants <= 0)
                return BadRequest(new { IsSuccess = false, Message = "Numărul maxim de participanți trebuie să fie cel puțin 1." });

            try
            {
                var result = _tour.CreateTourAction(guideId, data);
                if (!result.IsSuccess) return Conflict(result); // 409
                return Created("/api/tours", result); // 201
            }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare la crearea turului: " + ex.Message }); }
        }

        [HttpPut("{id}/toggle")]
        public IActionResult ToggleActive(int id)
        {
            if (id <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul turului trebuie să fie pozitiv." });

            try
            {
                var result = _tour.ToggleTourActiveAction(id);
                if (!result.IsSuccess) return NotFound(result);
                return Ok(result);
            }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare internă: " + ex.Message }); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul turului trebuie să fie pozitiv." });

            try
            {
                var result = _tour.DeleteTourAction(id);
                if (!result.IsSuccess) return NotFound(result);
                return Ok(result);
            }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare la ștergerea turului: " + ex.Message }); }
        }
    }
}
