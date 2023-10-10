using Microsoft.AspNetCore.Mvc;
using Ticket_Reservation_System.Models;
using Ticket_Reservation_System.Services;

namespace Ticket_Reservation_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        // POST: api/Users
        [HttpPost("traveler/create")]
        public async Task<IActionResult> CreateUser(User user)
        {
            try
            {
                await _userService.CreateAsync(user);
                return StatusCode(201); // Return HTTP 201 (Created) status code
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // POST: api/Users/traveler/login
        [HttpPost("traveler/login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var user = await _userService.AuthenticateAsync(request.Email, request.Password);

                if (user != null)
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
