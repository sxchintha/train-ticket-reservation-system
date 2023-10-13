using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Ticket_Reservation_System.Models
{
    [BsonIgnoreExtraElements]
    public class BackOffice
    {
        //Get or Set first name of the back office user
        [BsonElement("firstName")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string FirstName { get; set; } = null!;

        //Get or Set last name of the back office user
        [BsonElement("lastName")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string LastName { get; set; } = null!;

        //Get or Set email address of the back office user
        [BsonId]
        [BsonElement("email")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string Email { get; set; } = null!;

        //Get or Set phone number of the back office user
        [BsonElement("phone")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string Phone { get; set; } = null!;

        //Get or Set password of the back office user
        [BsonElement("password")]
        [BsonRepresentation(BsonType.String)]
        [BsonRequired]
        public string Password { get; set; } = null!;

        //Get or Set status of the back office user
        [BsonElement("status")]
        [JsonIgnore]
        [BsonRepresentation(BsonType.String)]
        public string Status { get; set; } = "active";

        //hash the password of the back office user
        public void SetPassword(string password)
        {
            Password = BCrypt.Net.BCrypt.HashPassword(password);
        }

        public bool VerifyPassword(string providedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(providedPassword, Password);
        }

    }

    //Db connection settings for BackOffice Database.
    public class BackOfficeDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string BackOfficeCollectionName { get; set; } = null!;
    }
}
