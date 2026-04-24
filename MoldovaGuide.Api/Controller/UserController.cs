using MoldovaGuide.BusinessLayer.Interfaces;
using MoldovaGuide.Domain.Models.User;
using Microsoft.AspNetCore.Mvc;

namespace MoldovaGuide.Api.Controller
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserProfileAction _user;
        public UserController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _user = bl.UserProfileAction();
        }

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            try
            {
                var users = _user.GetAllUsersAction();
                return Ok(users); // 200
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { IsSuccess = false, Message = "Eroare la obținerea utilizatorilor: " + ex.Message });
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if (id <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul utilizatorului trebuie să fie pozitiv." });

            try
            {
                var user = _user.GetUserByIdAction(id);
                if (user == null)
                    return NotFound(new { IsSuccess = false, Message = $"Utilizatorul cu ID={id} nu a fost găsit." }); // 404
                return Ok(user); // 200
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { IsSuccess = false, Message = "Eroare internă: " + ex.Message });
            }
        }

        [HttpPut("{id}/profile")]
        public IActionResult UpdateProfile(int id, [FromBody] UserProfileUpdateDto data)
        {
            if (id <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul utilizatorului trebuie să fie pozitiv." });

            if (data == null)
                return BadRequest(new { IsSuccess = false, Message = "Datele de profil sunt obligatorii." });

            try
            {
                var result = _user.UpdateProfileAction(id, data);
                if (!result.IsSuccess)
                    return NotFound(result); // 404 — user not found
                return Ok(result); // 200
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { IsSuccess = false, Message = "Eroare la actualizarea profilului: " + ex.Message });
            }
        }

        [HttpPut("{id}/block")]
        public IActionResult Block(int id)
        {
            if (id <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul utilizatorului trebuie să fie pozitiv." });

            try
            {
                var result = _user.BlockUserAction(id);
                if (!result.IsSuccess)
                    return NotFound(result); // 404
                return Ok(result); // 200
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { IsSuccess = false, Message = "Eroare la blocarea utilizatorului: " + ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest(new { IsSuccess = false, Message = "ID-ul utilizatorului trebuie să fie pozitiv." });

            try
            {
                var result = _user.DeleteUserAction(id);
                if (!result.IsSuccess)
                    return NotFound(result); // 404
                return Ok(result); // 200
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { IsSuccess = false, Message = "Eroare la ștergerea utilizatorului: " + ex.Message });
            }
        }
    }
}
