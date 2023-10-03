using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Ticket_Reservation_System.Models
{
    public class Booking
    {
        /// Gets or sets the unique identifier for the Booking.
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

        /// Gets or sets the sheduledate.
        [BsonElement("sheduledate")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string Sheduledate { get; set; } = null!;

        /// Gets or sets the sheduletime.
        [BsonElement("sheduletime")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string Sheduletime { get; set; } = null!;

        /// Gets or sets the ticket quentity
        [BsonElement("quentity")]
        [BsonRepresentation(BsonType.String)]
        public string Quentity { get; set; } = null!;

        /// Gets or sets the ticket quentity
        [BsonElement("price")]
        [BsonRepresentation(BsonType.String)]
        public string Price { get; set; } = null!;

    }
}
