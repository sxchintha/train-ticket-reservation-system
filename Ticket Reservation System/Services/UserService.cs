using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Ticket_Reservation_System.Models;

namespace Ticket_Reservation_System.Services
{
    public class UserService
    {
        //MongoDB collection for storing Booking details
        private readonly IMongoCollection<User> _users;

        public UserService(IOptions<UserDatabaseSettings> userDatabaseSettings)
        {
            var mongoClient = new MongoClient(userDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(userDatabaseSettings.Value.DatabaseName);
                _users = mongoDatabase.GetCollection<User>(userDatabaseSettings.Value.UserCollectionName);
        }

        public async Task<User> CreateAsync(User newUser)
        {
            await _users.InsertOneAsync(newUser);
            return newUser;
        }
    }
}
