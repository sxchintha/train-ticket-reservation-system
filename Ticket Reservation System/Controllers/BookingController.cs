/*
 * This controller handles every API endpoint connected to ticket booking operations.
It offers functions such as creating, updating, retrieving, and canceling reservations.
*/

using Microsoft.AspNetCore.Mvc;
using System.Net;
using Ticket_Reservation_System.Models;
using Ticket_Reservation_System.Services;

namespace Ticket_Reservation_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly BookingService _bookingService;
        private readonly TrainService _trainService;

        public BookingController(BookingService bookingService, TrainService trainService)
        {
            _bookingService = bookingService;
            _trainService = trainService;
        }

        //create a booking
        // POST: api/Bookings
        [HttpPost("create")]
        public async Task<IActionResult> CreateBooking([FromBody] Booking booking)
        {
            try
            {
                // Check if the user already has 4 or more bookings
                int bookingCount = await _bookingService.GetBookingCountByNicAsync(booking.Nic);

                if (bookingCount >= 4)
                {
                    var errorResponse = new ObjectResult(new Dictionary<string, string>
            {
                { "error", "You have reached the maximum limit of bookings (4) for this NIC." }
            })
                    {
                        StatusCode = (int)HttpStatusCode.BadRequest
                    };

                    return errorResponse;
                }

                var createdDate = DateTime.Now;
                var scheduledDate = DateTime.Parse(booking.Sheduledate);

                // Calculate the difference in days between the current date and the scheduled date
                int daysUntilScheduledDate = (int)(scheduledDate - createdDate).TotalDays;

                if (daysUntilScheduledDate > 30)
                {
                    return BadRequest("Scheduled date must be at least 30 days in the future.");
                }

                // Find the corresponding train document
                var train = await _trainService.GetTrainByTrainIdAsync(booking.TrainID);

                if (train != null)
                {
                    // Calculate the new available seats after booking
                    int newAvailableSeats = train.AvailableSeats - int.Parse(booking.Quentity);

                    if (newAvailableSeats >= 0)
                    {
                        // Update the train's available seats
                        train.AvailableSeats = newAvailableSeats;

                        // Update the train in the database
                        await _trainService.UpdateAsync(train.Id, train);
                    }
                    else
                    {
                        var errorResponse = new ObjectResult(new Dictionary<string, string>
                {
                    { "error", "Not enough available seats for this booking." }
                })
                        {
                            StatusCode = (int)HttpStatusCode.BadRequest
                        };

                        return errorResponse;
                    }
                }
                else
                {
                    var errorResponse = new ObjectResult(new Dictionary<string, string>
            {
                { "error", "Train not found." }
            })
                    {
                        StatusCode = (int)HttpStatusCode.BadRequest
                    };

                    return errorResponse;
                }

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
                    return Ok(new { error = "Booking canceled successfully" });
                   // {
                        //Message = "Booking canceled successfully",
                      //  Booking = booking
                   // });
                }
                else
                {
                    return BadRequest(new { error = "Booking cannot be canceled" });
                   // {
                       // Message = "Booking cannot be canceled.",
                        //Reason = "The scheduled date is less than 5 days from the current date."
                   // });
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

                // Modify each booking to include the "status" property in the response
                var modifiedBookings = Bookings.Select(booking => new
                {
                    Id = booking.Id,
                    TrainID = booking.TrainID,
                    Nic = booking.Nic,
                    TrainName = booking.TrainName,
                    Sheduledate = booking.Sheduledate,
                    Sheduletime = booking.Sheduletime,
                    FromStation = booking.FromStation,
                    ToStation = booking.ToStation,
                    Quentity = booking.Quentity,
                    Price = booking.Price,
                    Status = booking.Status, // Include the status here
                    CreatedDate = booking.CreatedDate
                });

                return Ok(modifiedBookings);
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

        //get bookings by nic
        [HttpGet("my/{nic}")]

        public async Task<ActionResult<Booking>> GetBookingByNic(string nic)
        {
            try
            {
                var Booking = await _bookingService.GetBookingsByNicAsync(nic);
                if (Booking == null)
                {
                    return NotFound();
                }
                return Ok(Booking);
            } catch (Exception ex)
            {
                return StatusCode(500, new {error = ex.Message});
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

