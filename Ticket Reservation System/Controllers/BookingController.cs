using Microsoft.AspNetCore.Mvc;
using Ticket_Reservation_System.Models;
using Ticket_Reservation_System.Services;

namespace Ticket_Reservation_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly BookingService _bookingService;

        public BookingController(BookingService bookingService)
        {
            _bookingService = bookingService;
        }

        // POST: api/Bookings
        [HttpPost("create")]
        public async Task<IActionResult> CreateBooking([FromBody] Booking booking)
        {
            try
            {
                // Create a new Booking object excluding the "id" property
                var newBooking = new Booking
                {
                    TrainID = booking.TrainID,
                    TrainName = booking.TrainName,
                    Sheduledate = booking.Sheduledate,
                    Sheduletime = booking.Sheduletime,
                    Quentity = booking.Quentity,
                    Price = booking.Price
                };

                await _bookingService.CreateAsync(newBooking);
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // PUT: api/Bookings/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<Booking>> UpdateBooking(string id, Booking updatedBooking)
        {
            try
            {
                var Booking = await _bookingService.UpdateAsync(id, updatedBooking);
                if (Booking == null)
                {
                    return NotFound();
                }
                return Ok(Booking);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
       
        // PATCH: api/Bookings/cancel/{id}
        [HttpPatch("cancel/{id}")]
        public async Task<ActionResult<Booking>> CancelBooking(string id)
        {
            try
            {
                var Booking = await _bookingService.CancelBookingAsync(id);
                if (Booking == null)
                {
                    return NotFound();
                }
                return Ok(Booking);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception)
            {
                return BadRequest(new { error = "An error occurred while cancelling the Booking." });
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            try
            {
                var Bookings = await _bookingService.GetAllBookingsAsync();
                return Ok(Bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBookingById(string id)
        {
            try
            {
                var Booking = await _bookingService.GetBookingByIdAsync(id);
                if (Booking == null)
                {
                    return NotFound();
                }
                return Ok(Booking);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBookingById(string id)
        {
            try
            {
                var Booking = await _bookingService.GetBookingByIdAsync(id);
                if (Booking == null)
                {
                    return NotFound();
                }

                await _bookingService.DeleteBookingAsync(id);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

    }

}

