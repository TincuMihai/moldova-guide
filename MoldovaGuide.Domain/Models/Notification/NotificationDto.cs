namespace MoldovaGuide.Domain.Models.Notification
{
    public class NotificationDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Type { get; set; }
        public bool IsRead { get; set; }
        public string CreatedAt { get; set; }
    }
}
