using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoldovaGuide.Domain.Entities.SavedPlace
{
    public class SavedPlaceData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int UserId { get; set; }

        public int AttractionId { get; set; }

        [StringLength(500)]
        public string? Notes { get; set; }

        [DataType(DataType.Date)]
        public DateTime SavedAt { get; set; }
    }
}
