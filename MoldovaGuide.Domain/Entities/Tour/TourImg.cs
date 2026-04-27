using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
 
namespace MoldovaGuide.Domain.Entities.Tour
{
    public class TourImg
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
 
        [Required]
        [StringLength(500)]
        public string ImgUrl { get; set; }
 
        // FK catre Tour
        public int TourId { get; set; }
 
        [ForeignKey("TourId")]
        public TourData Tour { get; set; }
 
        public int SortOrder { get; set; }
    }
}
