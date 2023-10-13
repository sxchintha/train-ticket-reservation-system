using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;

namespace Ticket_Reservation_System.Models
{
    public class Train
    {
        // Get or set the unique id for the train.
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string Id { get; set; }

        // Get or set the train ID.
        [BsonElement("trainID")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string TrainID { get; set; } = null!;

        // Get or set the train name.
        [BsonElement("trainName")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string TrainName { get; set; } = null!;

        // Get or set the price per km for the trane(train rate).
        [BsonElement("pricePerKM")]
        public double PricePerKM { get; set; }

        [BsonElement("pricePerTicket")]
        public double PricePerTicket { get; set; }

        // Get or set the available seats of the train
        [BsonElement("availableSeats")]
        public int AvailableSeats { get; set; }

        // Get or set the schedule details of the train.
        [BsonElement("schedule")]
        public Schedule Schedule { get; set; } = new Schedule();

        // Get or set the current status of the train
        //available or not
        [BsonElement("status")]
        [BsonRepresentation(BsonType.String)]
        public string Status { get; set; } =null!;

        // Get or set the list of reservations.
        [BsonElement("reservations")]
        public List<string> Reservations { get; set; } = new List<string>();

        //Get or Set train shedule status publish or unpublish
        [BsonElement("publishStatus")]
        [JsonIgnore]
        [BsonRepresentation(BsonType.String)]
        public string PublishStatus { get; set; } = "Unpublished";

    }

    // represents the train's schedule information, such as station information and departure and arrival times.
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

    //represents the  station distance info. station and distance from the start.
    public class StationDistance
    {
        public string Station { get; set; } = null!;

        [BsonRepresentation(BsonType.Double)]
        public double DistanceFromStart { get; set; }
    }

    //Train managment Db connection settings for Tran shedule Database.
    public class TrainDatabaseSetting
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string TrainCollectionName { get; set; } = null!;


    }
}
