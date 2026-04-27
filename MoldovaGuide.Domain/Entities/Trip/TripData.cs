using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MoldovaGuide.Domain.Entities.User;
 
namespace MoldovaGuide.Domain.Entities.Trip
{
    public class TripData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
 
        // FK catre User — N:1
        public int UserId { get; set; }
 
        [ForeignKey("UserId")]
        public UserData User { get; set; }
 
        [Required]
        [StringLength(100)]
        public string Title { get; set; }
 
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
 
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }
 
        public bool IsPublic { get; set; }
 
        public bool IsDeleted { get; set; }
 
        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; }
 
        // ── Navigation collection (1:N) ──
 
        [InverseProperty("Trip")]
        public List<TripItemData> Items { get; set; } = new();
    }
}
