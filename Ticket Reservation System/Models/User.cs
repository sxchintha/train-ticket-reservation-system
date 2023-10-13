using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Ticket_Reservation_System.Models
{ 
    public class User
    {
        //Get or Set nic of the traveler. nic is used as primary key here
        [BsonId]
        [BsonElement("nic")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string Nic { get; set; } = null!;

        //Get or Set first Name of the traveler
        [BsonElement("firstName")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string FirstName { get; set; } = null!;

        //Get or Set last Name of the traveler
        [BsonElement("lastName")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string LastName { get; set; } = null!;

        //Get or Set email of the traveler
        [BsonElement("email")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string Email { get; set; } = null!;

        //Get or Set phone number of the traveler
        [BsonElement("phone")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string Phone { get; set; } = null!;

        //Get or Set password of the traveler
        [BsonElement("password")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string Password { get; set; } = null!;

        //Get or Set active and deactive status of the traveler
        [BsonElement("status")]
        [JsonIgnore]
        [BsonRepresentation(BsonType.String)]
        public string Status { get; set; } = "active";

        //Hash traveler password
        public void SetPassword(string password)
        {
            Password = BCrypt.Net.BCrypt.HashPassword(password);
        }

        public bool VerifyPassword(string providedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(providedPassword, Password);
        }
    }

    //Db connection settings for Traveler Database.
    //User is refered as traveler.
    public class UserDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string UserCollectionName { get; set; } = null!;
    }
}

