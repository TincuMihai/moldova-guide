using MoldovaGuide.BusinessLayer.Interfaces;
using MoldovaGuide.Domain.Models.User;
using Microsoft.AspNetCore.Mvc;

namespace MoldovaGuide.Api.Controller
{
    [Route("api/session")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        internal IUserLoginAction _userAction;
        public AuthController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _userAction = bl.UserLoginAction();
        }

        [HttpPost("auth")]
        public IActionResult Auth([FromBody] UserLoginDto udata)
        {
            // Validation
            if (udata == null)
                return BadRequest(new { IsSuccess = false, Message = "Datele de autentificare sunt obligatorii." });

            if (string.IsNullOrWhiteSpace(udata.Email))
                return BadRequest(new { IsSuccess = false, Message = "Email-ul este obligatoriu." });

            if (string.IsNullOrWhiteSpace(udata.Password))
                return BadRequest(new { IsSuccess = false, Message = "Parola este obligatorie." });

            if (!udata.Email.Contains("@"))
                return BadRequest(new { IsSuccess = false, Message = "Formatul email-ului este invalid." });

            try
            {
                var data = _userAction.UserLoginDataValidation(udata);
                if (data == null)
                    return Unauthorized(new { IsSuccess = false, Message = "Email sau parolă incorectă." });

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { IsSuccess = false, Message = "Eroare internă la autentificare: " + ex.Message });
            }
        }
    }
}
