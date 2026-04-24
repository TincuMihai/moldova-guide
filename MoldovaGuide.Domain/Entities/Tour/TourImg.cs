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

        public int TourId { get; set; }

        public int SortOrder { get; set; }
    }
}
