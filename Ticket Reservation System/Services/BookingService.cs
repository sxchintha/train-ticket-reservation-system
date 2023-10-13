using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Ticket_Reservation_System.Models;

namespace Ticket_Reservation_System.Services
{
    public class BookingService
    {
        // Mongo collection for storing Ticket reservation details.
        private readonly IMongoCollection<Booking> _bookingsCollection;

        public BookingService(IOptions<BookingDatabaseSetting> bookingDatabaseSettings)
        {
            var mongoClient = new MongoClient(bookingDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(bookingDatabaseSettings.Value.DatabaseName);
            _bookingsCollection = mongoDatabase.GetCollection<Booking>(bookingDatabaseSettings.Value.BookingCollectionName);
        }

        public async Task<Booking> CreateAsync(Booking newBooking)
        {
            await _bookingsCollection.InsertOneAsync(newBooking);
            return newBooking;
        }

        public async Task<Booking?> UpdateAsync(string id, Booking updatedBooking)
        {
            // Use the existing _id value from the updatedBooking
            updatedBooking.Id = id;

            var result = await _bookingsCollection.ReplaceOneAsync(booking => booking.Id == id, updatedBooking);

            if (result.MatchedCount == 0)
            {
                return null;
            }

            return updatedBooking;
        }

        public async Task<Booking?> CancelBookingAsync(string id)
        {
            var booking = await _bookingsCollection.Find(b => b.Id == id).FirstOrDefaultAsync();
            if (booking == null)
            {
                return null;
            }

            // Check if the booking can be canceled based on the date
            DateTime currentDate = DateTime.UtcNow; //UTC time
            DateTime scheduledDate = DateTime.Parse(booking.Sheduledate);

            // Calculate the difference in days between the current date and the scheduled date
            int daysUntilScheduledDate = (int)(scheduledDate - currentDate).TotalDays;

            if (daysUntilScheduledDate >= 5)
            {
                // Booking can be canceled
                // Update the booking status to "canceled".
                booking.Status = "canceled";
                await _bookingsCollection.ReplaceOneAsync(b => b.Id == id, booking);
                return booking;
            }
            else
            {
                return booking;
            }
        }


        public async Task<List<Booking>> GetAllBookingsAsync() =>
            await _bookingsCollection.Find(_ => true).ToListAsync();

        public async Task<Booking?> GetBookingByIdAsync(string id) =>
            await _bookingsCollection.Find(Booking => Booking.Id == id).FirstOrDefaultAsync();

        public async Task DeleteBookingAsync(string id) =>
            await _bookingsCollection.DeleteOneAsync(Booking => Booking.Id == id);

    }
}
