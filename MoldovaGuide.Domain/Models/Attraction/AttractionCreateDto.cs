namespace MoldovaGuide.Domain.Models.Attraction
{
    public class AttractionCreateDto
    {
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string? OpeningHours { get; set; }
        public string PriceLevel { get; set; }
        public string? Phone { get; set; }
        public string? Website { get; set; }
        public List<string>? Tags { get; set; }
        public List<string>? Images { get; set; }
    }
}
