using MoldovaGuide.BusinessLayer.Interfaces;
using MoldovaGuide.Domain.Models.Review;
using Microsoft.AspNetCore.Mvc;

namespace MoldovaGuide.Api.Controller
{
    [Route("api/reviews")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private IReviewAction _review;
        public ReviewController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _review = bl.ReviewAction();
        }

        [HttpGet("attraction/{attractionId}")]
        public IActionResult GetByAttraction(int attractionId)
        {
            if (attractionId <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul atracției trebuie să fie pozitiv." });

            try { return Ok(_review.GetReviewsByAttractionAction(attractionId)); }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare internă: " + ex.Message }); }
        }

        [HttpGet("tour/{tourId}")]
        public IActionResult GetByTour(int tourId)
        {
            if (tourId <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul turului trebuie să fie pozitiv." });

            try { return Ok(_review.GetReviewsByTourAction(tourId)); }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare internă: " + ex.Message }); }
        }

        [HttpPost("{userId}")]
        public IActionResult Create(int userId, [FromBody] ReviewCreateDto data)
        {
            if (userId <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul utilizatorului trebuie să fie pozitiv." });

            if (data == null)
                return BadRequest(new { IsSuccess = false, Message = "Datele recenziei sunt obligatorii." });

            if (data.Rating < 1 || data.Rating > 5)
                return BadRequest(new { IsSuccess = false, Message = "Rating-ul trebuie să fie între 1 și 5." });

            if (string.IsNullOrWhiteSpace(data.Comment))
                return BadRequest(new { IsSuccess = false, Message = "Comentariul este obligatoriu." });

            if (data.Comment.Length < 10)
                return BadRequest(new { IsSuccess = false, Message = "Comentariul trebuie să conțină minim 10 caractere." });

            if (data.TourId == null && data.AttractionId == null)
                return BadRequest(new { IsSuccess = false, Message = "Recenzia trebuie asociată unui tur sau unei atracții." });

            try
            {
                var result = _review.CreateReviewAction(userId, data);
                return Created("/api/reviews", result); // 201
            }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare la crearea recenziei: " + ex.Message }); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul recenziei trebuie să fie pozitiv." });

            try
            {
                var result = _review.DeleteReviewAction(id);
                if (!result.IsSuccess) return NotFound(result);
                return Ok(result);
            }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare la ștergerea recenziei: " + ex.Message }); }
        }
    }
}
