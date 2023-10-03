namespace Ticket_Reservation_System.Models
{
    public class BookingDatabaseSetting
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string BookingCollectionName { get; set; } = null!;

    }
}
