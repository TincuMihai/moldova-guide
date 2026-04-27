using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MoldovaGuide.Domain.Entities.User;
using MoldovaGuide.Domain.Entities.Booking;
using MoldovaGuide.Domain.Entities.Review;
 
namespace MoldovaGuide.Domain.Entities.Tour
{
    public class TourData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
 
        [Required]
        [StringLength(150)]
        public string Title { get; set; }
 
        [Required]
        [StringLength(150)]
        public string Slug { get; set; }
 
        [StringLength(300)]
        public string ShortDescription { get; set; }
 
        [StringLength(3000)]
        public string Description { get; set; }
 
        [StringLength(30)]
        public string Theme { get; set; }
 
        [StringLength(20)]
        public string Duration { get; set; }
 
        [StringLength(20)]
        public string Difficulty { get; set; }
 
        [StringLength(200)]
        public string? Language { get; set; }
 
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }
 
        [StringLength(5)]
        public string Currency { get; set; }
 
        public int MaxParticipants { get; set; }
 
        public int CurrentParticipants { get; set; }
 
        // FK catre User (Guide) — N:1
        public int GuideId { get; set; }
 
        [ForeignKey("GuideId")]
        public UserData Guide { get; set; }
 
        [Column(TypeName = "decimal(3,1)")]
        public decimal Rating { get; set; }
 
        public int ReviewCount { get; set; }
 
        public bool IsFeatured { get; set; }
 
        public bool IsActive { get; set; }
 
        public bool IsDeleted { get; set; }
 
        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; }
 
        [DataType(DataType.Date)]
        public DateTime? UpdatedAt { get; set; }
 
        // ── Navigation collections (1:N) ──
 
        [InverseProperty("Tour")]
        public List<TourImg> Images { get; set; } = new();
 
        [InverseProperty("Tour")]
        public List<TourStopData> Stops { get; set; } = new();
 
        [InverseProperty("Tour")]
        public List<BookingData> Bookings { get; set; } = new();
 
        [InverseProperty("Tour")]
        public List<ReviewData> TourReviews { get; set; } = new();
    }
}
