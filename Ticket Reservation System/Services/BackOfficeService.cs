using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Ticket_Reservation_System.Models;

namespace Ticket_Reservation_System.Services
{
    public class BackOfficeService
    {
        //MongoDB collection for storing Booking details
        private readonly IMongoCollection<BackOffice> _backOffice;

        public BackOfficeService(IOptions<BackOfficeDatabaseSettings> backOfficeDatabaseSettings)
        {
            var mongoClient = new MongoClient(backOfficeDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(backOfficeDatabaseSettings.Value.DatabaseName);
            _backOffice = mongoDatabase.GetCollection<BackOffice>(backOfficeDatabaseSettings.Value.BackOfficeCollectionName);
        }

        public async Task<BackOffice> CreateAsync(BackOffice newBackOffice)
        {
            await _backOffice.InsertOneAsync(newBackOffice);
            return newBackOffice;
        }

        public async Task<BackOffice> AuthenticateAsync(string email, string password)
        {
            var user = await _backOffice.Find(u => u.Email == email).FirstOrDefaultAsync();

            if (user != null && user.VerifyPassword(password))
            {
                return user;
            }

            return null;
        }
    }
}
