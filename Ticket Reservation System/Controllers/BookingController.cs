/*
 * This controller handles every API endpoint connected to ticket booking operations.
It offers functions such as creating, updating, retrieving, and canceling reservations.
*/

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

        //create a booking
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
                    Nic = booking.Nic,
                    Sheduledate = booking.Sheduledate,
                    Sheduletime = booking.Sheduletime,
                    FromStation = booking.FromStation,
                    ToStation = booking.ToStation,
                    Quentity = booking.Quentity,
                    Price = booking.Price,
                    CreatedDate = DateTime.Now
                };

                await _bookingService.CreateAsync(newBooking);
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        //Update booking by booking id
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

        //Cancel booking by id.
        // PATCH: api/Bookings/cancel/{id}
        [HttpPatch("cancel/{id}")]
        public async Task<ActionResult> CancelBooking(string id)
        {
            try
            {
                var booking = await _bookingService.CancelBookingAsync(id);
                if (booking == null)
                {
                    return NotFound("Booking not found");
                }

                // Check if the booking is an error response
                if (booking is Booking && ((Booking)booking).Status == "canceled")
                {
                    return Ok(new
                    {
                        Message = "Booking canceled successfully",
                        Booking = booking
                    });
                }
                else
                {
                    return BadRequest(new
                    {
                        Message = "Booking cannot be canceled.",
                        Reason = "The scheduled date is less than 5 days from the current date."
                    });
                }
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception)
            {
                return BadRequest(new { error = "An error occurred while canceling the Booking." });
            }
        }


        //Get All bookings
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

        //get each booking by booking id
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

        //delete the booking by id
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

