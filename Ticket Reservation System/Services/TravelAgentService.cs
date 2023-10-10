using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Ticket_Reservation_System.Models;

namespace Ticket_Reservation_System.Services
{
    public class TravelAgentService
    {
        //MongoDB collection for storing Booking details
        private readonly IMongoCollection<TravelAgent> _travelAgent;

        public TravelAgentService(IOptions<TravelAgentDatabaseSettings> travelAgentDatabaseSettings)
        {
            var mongoClient = new MongoClient(travelAgentDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(travelAgentDatabaseSettings.Value.DatabaseName);
            _travelAgent = mongoDatabase.GetCollection<TravelAgent>(travelAgentDatabaseSettings.Value.TravelAgentCollectionName);
        }

        public async Task<TravelAgent> CreateAsync(TravelAgent newTravelAgent)
        {
            await _travelAgent.InsertOneAsync(newTravelAgent);
            return newTravelAgent;
        }

        public async Task<TravelAgent> AuthenticateAsync(string email, string password)
        {
            var user = await _travelAgent.Find(u => u.Email == email).FirstOrDefaultAsync();

            if (user != null && user.VerifyPassword(password))
            {
                return user;
            }

            return null;
        }
    }
}
