namespace MoldovaGuide.Domain.Models.Tour
{
    public class TourDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public string Theme { get; set; }
        public string Duration { get; set; }
        public string Difficulty { get; set; }
        public List<string> Language { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; }
        public int MaxParticipants { get; set; }
        public int CurrentParticipants { get; set; }
        public decimal Rating { get; set; }
        public int ReviewCount { get; set; }
        public bool IsFeatured { get; set; }
        public bool IsActive { get; set; }
        public List<string> Images { get; set; }
        public TourGuideDto Guide { get; set; }
        public List<TourStopDto>? Stops { get; set; }
    }

    public class TourGuideDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
    }

    public class TourStopDto
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public string Duration { get; set; }
    }
}
