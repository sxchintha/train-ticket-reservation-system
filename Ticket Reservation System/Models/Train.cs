using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;

namespace Ticket_Reservation_System.Models
{
    public class Train
    {
        /// Gets or sets the unique identifier for the train.
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string Id { get; set; }

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

        [BsonElement("pricePerKM")]
        public double PricePerKM { get; set; }

        [BsonElement("pricePerTicket")]
        public double PricePerTicket { get; set; }

        /// Gets or sets the list of seats for different classes.
        [BsonElement("availableSeats")]
        public int AvailableSeats { get; set; }

        /// Gets or sets the schedule details of the train.
        [BsonElement("schedule")]
        public Schedule Schedule { get; set; } = new Schedule();

        /// Gets or sets the current status of the train (e.g. active, inactive).
        [BsonElement("status")]
        [BsonRepresentation(BsonType.String)]
        public string Status { get; set; } =null!;

        /// Gets or sets the list of reservation identifiers associated with the train.
        [BsonElement("reservations")]
        public List<string> Reservations { get; set; } = new List<string>();

        [BsonElement("publishStatus")]
        [JsonIgnore]
        [BsonRepresentation(BsonType.String)]
        public string PublishStatus { get; set; } = "Unpublished";

    }

    /// Represents the schedule details of a train, including departure and arrival times, and stations.
    public class Schedule
    {
        [BsonElement("departureTime")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime DepartureTime { get; set; }

        [BsonElement("arrivalTime")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime ArrivalTime { get; set; }

        [BsonElement("stationDistances")]
        public List<StationDistance> StationDistances { get; set; } = new List<StationDistance>();
    }

    public class StationDistance
    {
        public string Station { get; set; } = null!;

        [BsonRepresentation(BsonType.Double)]
        public double DistanceFromStart { get; set; }
    }

    public class TrainDatabaseSetting
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string TrainCollectionName { get; set; } = null!;


    }
}
