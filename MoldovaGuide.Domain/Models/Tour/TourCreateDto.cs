namespace MoldovaGuide.Domain.Models.Tour
{
    public class TourCreateDto
    {
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public string Theme { get; set; }
        public string Duration { get; set; }
        public string Difficulty { get; set; }
        public List<string> Language { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; }
        public int MaxParticipants { get; set; }
        public List<string>? Images { get; set; }
        public List<TourStopDto>? Stops { get; set; }
    }
}
