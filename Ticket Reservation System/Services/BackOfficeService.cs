using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Ticket_Reservation_System.Models;

namespace Ticket_Reservation_System.Services
{
    public class BackOfficeService
    {
        //Mongo collection for storing Back office user details
        private readonly IMongoCollection<BackOffice> _backOffice;

        public BackOfficeService(IOptions<BackOfficeDatabaseSettings> backOfficeDatabaseSettings)
        {
            var mongoClient = new MongoClient(backOfficeDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(backOfficeDatabaseSettings.Value.DatabaseName);
            _backOffice = mongoDatabase.GetCollection<BackOffice>(backOfficeDatabaseSettings.Value.BackOfficeCollectionName);
        }

        public async Task<BackOffice> CreateAsync(BackOffice newBackOffice)
        {
            // Check if the email already exists in the database
            var existingUser = await _backOffice.Find(u => u.Email == newBackOffice.Email).FirstOrDefaultAsync();

            if (existingUser != null)
            {
                throw new Exception("The email you entered is already exists.");
            }

            newBackOffice.SetPassword(newBackOffice.Password);
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
