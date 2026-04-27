using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MoldovaGuide.Domain.Entities.Review;
using MoldovaGuide.Domain.Entities.SavedPlace;
 
namespace MoldovaGuide.Domain.Entities.Attraction
{
    public class AttractionData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
 
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
 
        [Required]
        [StringLength(100)]
        public string Slug { get; set; }
 
        [StringLength(200)]
        public string ShortDescription { get; set; }
 
        [StringLength(2000)]
        public string Description { get; set; }
 
        [Required]
        [StringLength(50)]
        public string Category { get; set; }
 
        [StringLength(60)]
        public string City { get; set; }
 
        [StringLength(200)]
        public string Address { get; set; }
 
        [StringLength(100)]
        public string? OpeningHours { get; set; }
 
        [StringLength(20)]
        public string PriceLevel { get; set; }
 
        [StringLength(20)]
        public string? Phone { get; set; }
 
        [StringLength(200)]
        public string? Website { get; set; }
 
        [Column(TypeName = "decimal(3,1)")]
        public decimal Rating { get; set; }
 
        public int ReviewCount { get; set; }
 
        public bool IsFeatured { get; set; }
 
        [StringLength(500)]
        public string? Tags { get; set; }
 
        public bool IsDeleted { get; set; }
 
        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; }
 
        [DataType(DataType.Date)]
        public DateTime? UpdatedAt { get; set; }
 
        // ── Navigation collections (1:N) ──
 
        [InverseProperty("Attraction")]
        public List<AttractionImg> Images { get; set; } = new();
 
        [InverseProperty("Attraction")]
        public List<ReviewData> Reviews { get; set; } = new();
 
        [InverseProperty("Attraction")]
        public List<SavedPlaceData> SavedPlaces { get; set; } = new();
    }
}
