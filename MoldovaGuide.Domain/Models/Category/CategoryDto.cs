namespace MoldovaGuide.Domain.Models.Category
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Slug { get; set; }
        public string Name { get; set; }
        public string? Color { get; set; }
        public int Count { get; set; }
    }
}
