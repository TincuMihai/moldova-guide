using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
 
namespace MoldovaGuide.Domain.Entities.Trip
{
    public class TripItemData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
 
        // FK catre Trip — N:1
        public int TripId { get; set; }
 
        [ForeignKey("TripId")]
        public TripData Trip { get; set; }
 
        [DataType(DataType.Date)]
        public DateTime DayDate { get; set; }
 
        public int AttractionId { get; set; }
 
        [StringLength(100)]
        public string AttractionName { get; set; }
 
        [StringLength(10)]
        public string? Time { get; set; }
 
        [StringLength(20)]
        public string? Duration { get; set; }
 
        [StringLength(300)]
        public string? Notes { get; set; }
 
        public int SortOrder { get; set; }
    }
}
