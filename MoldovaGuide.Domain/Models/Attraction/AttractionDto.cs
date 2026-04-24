namespace MoldovaGuide.Domain.Models.Attraction
{
    public class AttractionDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string? OpeningHours { get; set; }
        public string PriceLevel { get; set; }
        public string? Phone { get; set; }
        public string? Website { get; set; }
        public decimal Rating { get; set; }
        public int ReviewCount { get; set; }
        public bool IsFeatured { get; set; }
        public List<string> Tags { get; set; }
        public List<string> Images { get; set; }
    }
}
