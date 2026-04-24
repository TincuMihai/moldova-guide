using Microsoft.AspNetCore.Mvc;

namespace MoldovaGuide.Api.Controller
{
    [Route("api/health")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { return Ok("MoldovaGuide API is healthy"); }
    }
}
