using MoldovaGuide.BusinessLayer.Interfaces;
using MoldovaGuide.Domain.Models.Booking;
using Microsoft.AspNetCore.Mvc;

namespace MoldovaGuide.Api.Controller
{
    [Route("api/bookings")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private IBookingAction _booking;
        public BookingController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _booking = bl.BookingAction();
        }

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            try { return Ok(_booking.GetAllBookingsAction()); }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare la obținerea rezervărilor: " + ex.Message }); }
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetByUser(int userId)
        {
            if (userId <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul utilizatorului trebuie să fie pozitiv." });

            try { return Ok(_booking.GetBookingsByUserAction(userId)); }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare internă: " + ex.Message }); }
        }

        [HttpPost("{userId}")]
        public IActionResult Create(int userId, [FromBody] BookingCreateDto data)
        {
            if (userId <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul utilizatorului trebuie să fie pozitiv." });

            if (data == null)
                return BadRequest(new { IsSuccess = false, Message = "Datele rezervării sunt obligatorii." });

            if (data.TourId <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul turului trebuie să fie pozitiv." });

            if (data.Participants <= 0)
                return BadRequest(new { IsSuccess = false, Message = "Numărul de participanți trebuie să fie cel puțin 1." });

            if (data.Participants > 20)
                return BadRequest(new { IsSuccess = false, Message = "Numărul maxim de participanți este 20." });

            if (string.IsNullOrWhiteSpace(data.Date))
                return BadRequest(new { IsSuccess = false, Message = "Data rezervării este obligatorie." });

            if (!DateTime.TryParse(data.Date, out var parsedDate))
                return BadRequest(new { IsSuccess = false, Message = "Formatul datei este invalid. Folosiți YYYY-MM-DD." });

            if (parsedDate < DateTime.Today)
                return BadRequest(new { IsSuccess = false, Message = "Nu puteți rezerva o dată din trecut." });

            try
            {
                var result = _booking.CreateBookingAction(userId, data);
                if (!result.IsSuccess) return BadRequest(result);
                return Created("/api/bookings", result); // 201
            }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare la crearea rezervării: " + ex.Message }); }
        }

        [HttpPut("{id}/status")]
        public IActionResult UpdateStatus(int id, [FromQuery] string status)
        {
            if (id <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul rezervării trebuie să fie pozitiv." });

            var validStatuses = new[] { "pending", "confirmed", "cancelled", "completed" };
            if (string.IsNullOrWhiteSpace(status) || !validStatuses.Contains(status.ToLower()))
                return BadRequest(new { IsSuccess = false, Message = "Statusul trebuie să fie: pending, confirmed, cancelled sau completed." });

            try
            {
                var result = _booking.UpdateBookingStatusAction(id, status.ToLower());
                if (!result.IsSuccess) return NotFound(result); // 404
                return Ok(result); // 200
            }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare la actualizarea statusului: " + ex.Message }); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul rezervării trebuie să fie pozitiv." });

            try
            {
                var result = _booking.DeleteBookingAction(id);
                if (!result.IsSuccess) return NotFound(result);
                return Ok(result);
            }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare la ștergerea rezervării: " + ex.Message }); }
        }
    }
}
