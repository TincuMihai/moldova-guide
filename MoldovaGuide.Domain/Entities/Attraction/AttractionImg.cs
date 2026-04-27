using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
 
namespace MoldovaGuide.Domain.Entities.Attraction
{
    public class AttractionImg
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
 
        [Required]
        [StringLength(500)]
        public string ImgUrl { get; set; }
 
        // FK catre Attraction
        public int AttractionId { get; set; }
 
        [ForeignKey("AttractionId")]
        public AttractionData Attraction { get; set; }
 
        public int SortOrder { get; set; }
    }
}
