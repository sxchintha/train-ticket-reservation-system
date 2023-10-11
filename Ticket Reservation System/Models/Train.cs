using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Ticket_Reservation_System.Models
{
    public class Train
    {
        /// Gets or sets the unique identifier for the train.
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        /// Gets or sets the train ID.
        [BsonElement("trainID")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string TrainID { get; set; } = null!;

        /// Gets or sets the train name.
        [BsonElement("trainName")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string TrainName { get; set; } = null!;

        /// Gets or sets the schedule details of the train.
        [BsonElement("schedule")]
        public Schedule Schedule { get; set; } = new Schedule();

        /// Gets or sets the current status of the train (e.g. active, inactive).
        [BsonElement("status")]
        [BsonRepresentation(BsonType.String)]
        public string Status { get; set; } = "inactive";

        /// Gets or sets the list of reservation identifiers associated with the train.
        [BsonElement("reservations")]
        public List<string> Reservations { get; set; } = new List<string>();

    }

    /// Represents the schedule details of a train, including departure and arrival times, and stations.
    public class Schedule
    {
        /// Gets or sets the departure time of the train.
        [BsonElement("departureTime")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime DepartureTime { get; set; }

        /// Gets or sets the arrival time of the train.
        [BsonElement("arrivalTime")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime ArrivalTime { get; set; }

        /// Gets or sets the list of stations that the train will pass through.
        [BsonElement("stations")]
        public List<string> Stations { get; set; } = new List<string>();
    }

    public class TrainDatabaseSetting
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string TrainCollectionName { get; set; } = null!;


    }
}
