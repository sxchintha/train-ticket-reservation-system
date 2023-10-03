using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Ticket_Reservation_System.Services;
using System.Threading.Tasks;
using Ticket_Reservation_System.Models;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

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
        
        //POST: api/Booking
        [HttpPost]
        public async Task<ActionResult<Booking>> CreateBooking(Booking booking);
        try

        {
            await _bookingService.CreateAsync(booking);
            return CreatedAtAction(nameof(GetBookingById), new { id = booking.Id }, booking);
        }
        catch (Exception e)
        {
            return BadRequest(new {error = e.Message});
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
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
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

                // GET: api/Bookings
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

                // GET: api/Bookings/{id}
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

