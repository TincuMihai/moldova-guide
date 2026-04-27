using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MoldovaGuide.Domain.Entities.User;
using MoldovaGuide.Domain.Entities.Attraction;
 
namespace MoldovaGuide.Domain.Entities.SavedPlace
{
    public class SavedPlaceData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
 
        // FK catre User — N:1
        public int UserId { get; set; }
 
        [ForeignKey("UserId")]
        public UserData User { get; set; }
 
        // FK catre Attraction — N:1
        public int AttractionId { get; set; }
 
        [ForeignKey("AttractionId")]
        public AttractionData Attraction { get; set; }
 
        [StringLength(500)]
        public string? Notes { get; set; }
 
        [DataType(DataType.Date)]
        public DateTime SavedAt { get; set; }
    }
}
