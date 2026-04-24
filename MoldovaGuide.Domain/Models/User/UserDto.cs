namespace MoldovaGuide.Domain.Models.User
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string? Avatar { get; set; }
        public string? Phone { get; set; }
        public string? Bio { get; set; }
        public string? Languages { get; set; }
        public string Role { get; set; }
        public string RegisteredOn { get; set; }
    }
}
