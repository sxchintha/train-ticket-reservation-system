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

        public async Task<List<User>>GetAllUsersAsync() => 
            await _users.Find(nic => true).ToListAsync();

        public async Task<User?> UpdateUserAsync(string nic, User updatedUser)
        {
            updatedUser.Nic = nic;

            var result = await _users.ReplaceOneAsync(user => user.Nic == nic, updatedUser);

            if (result.MatchedCount == 0)
            {
                return null;
            }

            return updatedUser;
        }

        public async Task DeleteUserAsync(string nic) => 
            await _users.DeleteOneAsync(User => User.Nic == nic);

        public async Task<User?> DeactivateUserAsync(string nic)
        {
            var user = await _users.Find(user => user.Nic == nic).FirstOrDefaultAsync();
            if (user == null)
            {
                return null;
            }

            // Toggle the status property
            user.Status = user.Status == "active" ? "deactive" : "active";

            await _users.ReplaceOneAsync(t => t.Nic == nic, user);
            return user;
        }

        public async Task<User?> GetUserByNic(string nic) =>
            await _users.Find(User => User.Nic == nic).FirstOrDefaultAsync();

        public async Task<User> AuthenticateAsync(string nic, string password)
        {
            var user = await _users.Find(u => u.Nic == nic).FirstOrDefaultAsync();

            if (user != null && user.Status == "active" && user.VerifyPassword(password))
            {
                return user;
            }

            return null;
        }
    }
}
