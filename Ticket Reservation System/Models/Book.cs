using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Ticket_Reservation_System.Models
{
    public class Booking
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string Id { get; set; }

        [BsonElement("trainID")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string TrainID { get; set; } = null!;

        [BsonElement("nic")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string Nic { get; set; } = null!;

        [BsonElement("trainName")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string TrainName { get; set; } = null!;

        [BsonElement("sheduledate")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string Sheduledate { get; set; } = null!;

        [BsonElement("sheduletime")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string Sheduletime { get; set; } = null!;

        [BsonElement("quentity")]
        [BsonRepresentation(BsonType.String)]
        public string Quentity { get; set; } = null!;

        [BsonElement("price")]
        [BsonRepresentation(BsonType.String)]
        public string Price { get; set; } = null!;

        [BsonElement("createdDate")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime CreatedDate { get; set; }

    }

    public class BookingDatabaseSetting
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string BookingCollectionName { get; set; } = null!;

    }
}
