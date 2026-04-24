using MoldovaGuide.BusinessLayer.Interfaces;
using MoldovaGuide.Domain.Models.User;
using Microsoft.AspNetCore.Mvc;

namespace MoldovaGuide.Api.Controller
{
    [Route("api/reg")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        internal IUserRegAction _userReg;
        public RegisterController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _userReg = bl.UserRegAction();
        }

        [HttpPost]
        public IActionResult Register([FromBody] UserRegisterDto uRegData)
        {
            if (uRegData == null)
                return BadRequest(new { IsSuccess = false, Message = "Datele de înregistrare sunt obligatorii." });

            if (string.IsNullOrWhiteSpace(uRegData.Name))
                return BadRequest(new { IsSuccess = false, Message = "Numele este obligatoriu." });

            if (string.IsNullOrWhiteSpace(uRegData.Email))
                return BadRequest(new { IsSuccess = false, Message = "Email-ul este obligatoriu." });

            if (!uRegData.Email.Contains("@"))
                return BadRequest(new { IsSuccess = false, Message = "Formatul email-ului este invalid." });

            if (string.IsNullOrWhiteSpace(uRegData.Password))
                return BadRequest(new { IsSuccess = false, Message = "Parola este obligatorie." });

            if (uRegData.Password.Length < 6)
                return BadRequest(new { IsSuccess = false, Message = "Parola trebuie să conțină minim 6 caractere." });

            var validRoles = new[] { "tourist", "guide" };
            if (!string.IsNullOrEmpty(uRegData.Role) && !validRoles.Contains(uRegData.Role.ToLower()))
                return BadRequest(new { IsSuccess = false, Message = "Rolul trebuie să fie 'tourist' sau 'guide'." });

            try
            {
                var data = _userReg.UserRegDataValidation(uRegData);
                if (data.IsSuccess)
                    return Ok(data); // 200
                return Conflict(data); // 409 — email already exists
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { IsSuccess = false, Message = "Eroare internă la înregistrare: " + ex.Message });
            }
        }
    }
}
