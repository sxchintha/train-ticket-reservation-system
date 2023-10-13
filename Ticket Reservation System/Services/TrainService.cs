using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Ticket_Reservation_System.Models;

namespace Ticket_Reservation_System.Services
{
    public class TrainService
    {
        /// MongoDB collection for storing train details.
        private readonly IMongoCollection<Train> _trainsCollection;

        public TrainService(IOptions<TrainDatabaseSetting> trainDatabaseSettings)
        {
            var mongoClient = new MongoClient(trainDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(trainDatabaseSettings.Value.DatabaseName);
            _trainsCollection = mongoDatabase.GetCollection<Train>(trainDatabaseSettings.Value.TrainCollectionName);
        }

        public async Task<Train> CreateAsync(Train newTrain)
        {
            await _trainsCollection.InsertOneAsync(newTrain);
            return newTrain;
        }

        public async Task<Train?> UpdateAsync(string id, Train updatedTrain)
        {
            var result = await _trainsCollection.ReplaceOneAsync(train => train.Id == id, updatedTrain);
            if (result.MatchedCount == 0)
            {
                return null;
            }
            return updatedTrain;
        }

        public async Task<Train?> CancelTrainAsync(string id)
        {
            var train = await _trainsCollection.Find(train => train.Id == id).FirstOrDefaultAsync();
            if (train == null)
            {
                return null;
            }

            if (train.Reservations.Count > 0)
            {
                throw new InvalidOperationException("Train has existing reservations and cannot be canceled.");
            }

            train.Status = "canceled";
            await _trainsCollection.ReplaceOneAsync(t => t.Id == id, train);
            return train;
        }

        public async Task<Train?> ChangeSheduleStatus(string id)
        {
            var train =await _trainsCollection.Find(train => train.Id == id).FirstOrDefaultAsync();
            if(train == null)
            {
                return null;
            }

            // Toggle the status property
            train.PublishStatus = train.PublishStatus == "Unpublished" ? "Published" : "Unpublished";
            await _trainsCollection.ReplaceOneAsync(train => train.Id == id, train);
            return train;
        }

        public async Task<List<Train>> GetAllTrainsAsync() =>
            await _trainsCollection.Find(_ => true).ToListAsync();

        public async Task<Train?> GetTrainByIdAsync(string id) =>
            await _trainsCollection.Find(train => train.Id == id).FirstOrDefaultAsync();

    }
}
