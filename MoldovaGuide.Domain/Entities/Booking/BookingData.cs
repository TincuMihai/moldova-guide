using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoldovaGuide.Domain.Entities.Booking
{
    public class BookingData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int TourId { get; set; }

        public int UserId { get; set; }

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
