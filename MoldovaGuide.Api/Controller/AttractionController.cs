using MoldovaGuide.BusinessLayer.Interfaces;
using MoldovaGuide.Domain.Models.Attraction;
using Microsoft.AspNetCore.Mvc;

namespace MoldovaGuide.Api.Controller
{
    [Route("api/attractions")]
    [ApiController]
    public class AttractionController : ControllerBase
    {
        private IAttractionAction _attraction;
        public AttractionController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _attraction = bl.AttractionAction();
        }

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            try { return Ok(_attraction.GetAllAttractionsAction()); }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare la obținerea atracțiilor: " + ex.Message }); }
        }

        [HttpGet("featured")]
        public IActionResult GetFeatured()
        {
            try { return Ok(_attraction.GetFeaturedAttractionsAction()); }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare la obținerea atracțiilor featured: " + ex.Message }); }
        }

        [HttpGet("{slug}")]
        public IActionResult GetBySlug(string slug)
        {
            if (string.IsNullOrWhiteSpace(slug))
                return BadRequest(new { IsSuccess = false, Message = "Slug-ul este obligatoriu." });

            try
            {
                var attraction = _attraction.GetAttractionBySlugAction(slug);
                if (attraction == null)
                    return NotFound(new { IsSuccess = false, Message = $"Atracția '{slug}' nu a fost găsită." });
                return Ok(attraction);
            }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare internă: " + ex.Message }); }
        }

        [HttpPost]
        public IActionResult Create([FromBody] AttractionCreateDto data)
        {
            if (data == null)
                return BadRequest(new { IsSuccess = false, Message = "Datele atracției sunt obligatorii." });

            if (string.IsNullOrWhiteSpace(data.Name))
                return BadRequest(new { IsSuccess = false, Message = "Numele atracției este obligatoriu." });

            if (data.Name.Length < 3)
                return BadRequest(new { IsSuccess = false, Message = "Numele atracției trebuie să conțină minim 3 caractere." });

            if (string.IsNullOrWhiteSpace(data.Category))
                return BadRequest(new { IsSuccess = false, Message = "Categoria este obligatorie." });

            if (string.IsNullOrWhiteSpace(data.City))
                return BadRequest(new { IsSuccess = false, Message = "Orașul este obligatoriu." });

            try
            {
                var result = _attraction.CreateAttractionAction(data);
                if (!result.IsSuccess)
                    return Conflict(result); // 409 — duplicate slug
                return Created($"/api/attractions/{data.Name.ToLower().Replace(" ", "-")}", result); // 201
            }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare la crearea atracției: " + ex.Message }); }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] AttractionCreateDto data)
        {
            if (id <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul atracției trebuie să fie pozitiv." });

            if (data == null)
                return BadRequest(new { IsSuccess = false, Message = "Datele atracției sunt obligatorii." });

            if (string.IsNullOrWhiteSpace(data.Name))
                return BadRequest(new { IsSuccess = false, Message = "Numele atracției este obligatoriu." });

            try
            {
                var result = _attraction.UpdateAttractionAction(id, data);
                if (!result.IsSuccess)
                    return NotFound(result); // 404
                return Ok(result); // 200
            }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare la actualizarea atracției: " + ex.Message }); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul atracției trebuie să fie pozitiv." });

            try
            {
                var result = _attraction.DeleteAttractionAction(id);
                if (!result.IsSuccess)
                    return NotFound(result); // 404
                return Ok(result); // 200
            }
            catch (Exception ex) { return StatusCode(500, new { IsSuccess = false, Message = "Eroare la ștergerea atracției: " + ex.Message }); }
        }
    }
}
