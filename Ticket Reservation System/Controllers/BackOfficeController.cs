using Microsoft.AspNetCore.Mvc;
using Ticket_Reservation_System.Models;
using Ticket_Reservation_System.Services;

namespace Ticket_Reservation_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BackOfficeController : ControllerBase
    {
       private readonly BackOfficeService _backOfficeService;

        public BackOfficeController(BackOfficeService backofficeService)
        {
            _backOfficeService = backofficeService;
        }

        //POST: api/BackOffice/create
        [HttpPost("create")]

        public async Task<IActionResult>CreateBackOffice(BackOffice backOffice)
        {
            try
            {
                await _backOfficeService.CreateAsync(backOffice);
                return StatusCode(201); // Return HTTP 201 (Created) status code
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // POST: api/BackOffice/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestTravelAgent request)
        {
            try
            {
                var user = await _backOfficeService.AuthenticateAsync(request.Email, request.Password);

                if (user != null && user.VerifyPassword(request.Password))
                {
                    return Ok(new { message = "Login successful" });
                }
                else
                {
                    return Unauthorized(new { error = "Invalid email or password" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
