using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Ticket_Reservation_System.Models;

namespace Ticket_Reservation_System.Services
{
    public class BookingService
    {
        // Mongo collection for storing Ticket reservation details.
        private readonly IMongoCollection<Booking> _bookingsCollection;
        private readonly IMongoCollection<Train> _trainsCollection; 

        public BookingService(IOptions<BookingDatabaseSetting> bookingDatabaseSettings, IOptions<TrainDatabaseSetting> trainDatabaseSettings)
        {
            var mongoClient = new MongoClient(bookingDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(bookingDatabaseSettings.Value.DatabaseName);
            _bookingsCollection = mongoDatabase.GetCollection<Booking>(bookingDatabaseSettings.Value.BookingCollectionName);

            var trainMongoClient = new MongoClient(trainDatabaseSettings.Value.ConnectionString);
            var trainMongoDatabase = trainMongoClient.GetDatabase(trainDatabaseSettings.Value.DatabaseName);
            _trainsCollection = trainMongoDatabase.GetCollection<Train>(trainDatabaseSettings.Value.TrainCollectionName);
        }


        public async Task<Booking> CreateAsync(Booking newBooking)
        {
            // Insert the new booking into the bookings collection
            await _bookingsCollection.InsertOneAsync(newBooking);

            // Find the corresponding train document and update its "reservations" array
            var filter = Builders<Train>.Filter.Eq(train => train.TrainID, newBooking.TrainID);
            var update = Builders<Train>.Update.Push(train => train.Reservations, newBooking.Id);
            var updateResult = await _trainsCollection.UpdateOneAsync(filter, update);

            if (updateResult.ModifiedCount == 0)
            {
                // Handle the case where the train document was not found or the update failed
                throw new Exception("Train not found or reservation update failed.");
            }

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
        public async Task<IEnumerable<Booking>> GetBookingsByNicAsync(string nic) =>
            await _bookingsCollection.Find(Booking => Booking.Nic == nic).ToListAsync();

        public async Task DeleteBookingAsync(string id) =>
            await _bookingsCollection.DeleteOneAsync(Booking => Booking.Id == id);

    }
}
