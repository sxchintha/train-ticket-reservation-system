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

        //GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            try
            {
                var Users = await _userService.GetAllUsersAsync();

                // Modify each user to include the "status" property in the response
                var modifiedUsers = Users.Select(user => new
                {
                    Nic = user.Nic,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Phone = user.Phone,
                    Password = user.Password,
                    Status = user.Status // Include the status here
                });

                return Ok(modifiedUsers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        //PUT: api/Users/{nic}
        [HttpPut("{nic}")]
        public async Task<ActionResult<User>> UpdateUser(string nic, User updatedUser)
        {
            try
            {
                var User = await _userService.UpdateUserAsync(nic, updatedUser);
                if (User == null)
                {
                    return NotFound();
                }

                return Ok(User);
            } 
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        //DELETE: api/Users/{nic}
        [HttpDelete("{nic}")]
        public async Task<ActionResult> DeleteUserByNic(string nic)
        {
            try
            {
                var User = await _userService.GetUserByNic(nic);
                if (User == null)
                {
                    return NotFound();
                }

                await _userService.DeleteUserAsync(nic);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        //GET: api/Users/{nic}
        [HttpGet("{nic}")]
        public async Task<ActionResult<User>> GetUserByNic(string nic)
        {
            try
            {
                var User = await _userService.GetUserByNic(nic);
                if (User == null)
                {
                    return NotFound();
                }
                return Ok(User);
            }
            catch(Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        //PATCH: api/User/deactivate/{nic}
        [HttpPatch("deactivate/{nic}")]
        public async Task<ActionResult<User>> DeactivateUser(string nic)
        {
            try
            {
                var User = await _userService.DeactivateUserAsync(nic);
                if (User == null)
                {
                    return NotFound();
                }
                return Ok(User);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception)
            {
                return BadRequest(new { error = "An error occurred while deactivating the account." });
            }
        }

        [HttpPost("traveler/login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var user = await _userService.AuthenticateAsync(request.Nic, request.Password);

                if (user != null && user.Status == "active" && user.VerifyPassword(request.Password))
                {
                    return Ok(new { message = "Login successful", userDetails = user });
                }
                else
                {
                    return Unauthorized(new { error = "Invalid NIC, password, or account is deactivated" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

    }
}
