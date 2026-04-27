using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MoldovaGuide.Domain.Entities.User;
 
namespace MoldovaGuide.Domain.Entities.Notification
{
    public class NotificationData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
 
        // FK catre User
        public int UserId { get; set; }
 
        [ForeignKey("UserId")]
        public UserData User { get; set; }
 
        [Required]
        [StringLength(500)]
        public string Text { get; set; }
 
        [StringLength(20)]
        public string Type { get; set; }
 
        public bool IsRead { get; set; }
 
        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; }
    }
}
