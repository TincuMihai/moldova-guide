namespace MoldovaGuide.Domain.Models.Review
{
    public class ReviewDto
    {
        public int Id { get; set; }
        public string Author { get; set; }
        public string? Avatar { get; set; }
        public decimal Rating { get; set; }
        public string Comment { get; set; }
        public string Date { get; set; }
        public int? TourId { get; set; }
        public int? AttractionId { get; set; }
    }
}
