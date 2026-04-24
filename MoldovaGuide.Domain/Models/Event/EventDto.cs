namespace MoldovaGuide.Domain.Models.Event
{
    public class EventDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string Venue { get; set; }
        public string? Image { get; set; }
        public string Price { get; set; }
    }
}
