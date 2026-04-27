using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
 
namespace MoldovaGuide.Domain.Entities.Tour
{
    public class TourStopData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
 
        // FK catre Tour
        public int TourId { get; set; }
 
        [ForeignKey("TourId")]
        public TourData Tour { get; set; }
 
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
 
        [StringLength(500)]
        public string? Description { get; set; }
 
        [StringLength(20)]
        public string Duration { get; set; }
 
        public int SortOrder { get; set; }
    }
}
