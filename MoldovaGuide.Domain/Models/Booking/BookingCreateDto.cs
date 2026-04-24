namespace MoldovaGuide.Domain.Models.Booking
{
    public class BookingCreateDto
    {
        public int TourId { get; set; }
        public string Date { get; set; }
        public int Participants { get; set; }
    }
}
