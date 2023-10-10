using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Ticket_Reservation_System.Models
{
    [BsonIgnoreExtraElements]
    public class BackOffice
    {
        [BsonElement("firstName")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string FirstName { get; set; } = null!;

        [BsonElement("lastName")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string LastName { get; set; } = null!;

        [BsonElement("email")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string Email { get; set; } = null!;

        [BsonElement("phone")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string Phone { get; set; } = null!;

        [BsonElement("password")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string Password { get; set; } = null!;

        [BsonElement("status")]
        [JsonIgnore]
        [BsonRepresentation(BsonType.String)]
        public string Status { get; set; } = "active";

        public bool VerifyPassword(string providedPassword)
        {
            // Compare the provided password with the stored password
            return Password == providedPassword;
        }

    }
    public class BackOfficeDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string BackOfficeCollectionName { get; set; } = null!;
    }
}
