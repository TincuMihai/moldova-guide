using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MoldovaGuide.Domain.Entities.Tour;
using MoldovaGuide.Domain.Entities.User;
 
namespace MoldovaGuide.Domain.Entities.Booking
{
    public class BookingData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
 
        // FK catre Tour — N:1
        public int TourId { get; set; }
 
        [ForeignKey("TourId")]
        public TourData Tour { get; set; }
 
        // FK catre User — N:1
        public int UserId { get; set; }
 
        [ForeignKey("UserId")]
        public UserData User { get; set; }
 
        [StringLength(20)]
        public string Status { get; set; }
 
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
 
        public int Participants { get; set; }
 
        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalPrice { get; set; }
 
        [StringLength(5)]
        public string Currency { get; set; }
 
        [StringLength(200)]
        public string? MeetingPoint { get; set; }
 
        public bool IsDeleted { get; set; }
 
        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; }
    }
}
