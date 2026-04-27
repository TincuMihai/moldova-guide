using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MoldovaGuide.Domain.Entities.User;
using MoldovaGuide.Domain.Entities.Tour;
using MoldovaGuide.Domain.Entities.Attraction;
 
namespace MoldovaGuide.Domain.Entities.Review
{
    public class ReviewData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
 
        // FK catre User — N:1
        public int UserId { get; set; }
 
        [ForeignKey("UserId")]
        public UserData User { get; set; }
 
        // FK catre Tour — N:1 (optional)
        public int? TourId { get; set; }
 
        [ForeignKey("TourId")]
        public TourData? Tour { get; set; }
 
        // FK catre Attraction — N:1 (optional)
        public int? AttractionId { get; set; }
 
        [ForeignKey("AttractionId")]
        public AttractionData? Attraction { get; set; }
 
        [Column(TypeName = "decimal(2,1)")]
        public decimal Rating { get; set; }
 
        [Required]
        [StringLength(1000)]
        public string Comment { get; set; }
 
        public bool IsDeleted { get; set; }
 
        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; }
    }
}
