using Microsoft.AspNetCore.Mvc;
using Ticket_Reservation_System.Models;
using Ticket_Reservation_System.Services;

namespace Ticket_Reservation_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelAgentController : ControllerBase
    {
        private readonly TravelAgentService _travelAgentService;

        public TravelAgentController(TravelAgentService travelAgentService)
        {
            _travelAgentService = travelAgentService;
        }

        //POST: api/TravelAgent/create
        [HttpPost("create")]

        public async Task<IActionResult>CrateTravelAgent(TravelAgent travelAgent)
        {
            try
            {
                await _travelAgentService.CreateAsync(travelAgent);
                return StatusCode(201); // Return HTTP 201 (Created) status code
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // POST: api/TravelAgent/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestTravelAgent request)
        {
            try
            {
                var user = await _travelAgentService.AuthenticateAsync(request.Email, request.Password);

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
