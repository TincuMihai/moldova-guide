using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoldovaGuide.Domain.Entities.User
{
    public class UserData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(60)]
        public string Name { get; set; }

        [Required]
        [StringLength(80)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [StringLength(60, MinimumLength = 6)]
        public string Password { get; set; }

        [StringLength(300)]
        public string? Avatar { get; set; }

        [StringLength(20)]
        public string? Phone { get; set; }

        [StringLength(500)]
        public string? Bio { get; set; }

        [StringLength(200)]
        public string? Languages { get; set; }

        public UserRole Role { get; set; }

        public bool IsBlocked { get; set; }

        [DataType(DataType.Date)]
        public DateTime RegisteredOn { get; set; }
    }
}
