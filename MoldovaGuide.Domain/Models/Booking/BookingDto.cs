namespace MoldovaGuide.Domain.Models.Booking
{
    public class BookingDto
    {
        public int Id { get; set; }
        public int TourId { get; set; }
        public string TourTitle { get; set; }
        public string? TourImage { get; set; }
        public int UserId { get; set; }
        public string GuideName { get; set; }
        public string Date { get; set; }
        public int Participants { get; set; }
        public decimal TotalPrice { get; set; }
        public string Currency { get; set; }
        public string Status { get; set; }
        public string? MeetingPoint { get; set; }
        public string CreatedAt { get; set; }
    }
}
