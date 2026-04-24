using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoldovaGuide.Domain.Entities.Event
{
    public class EventData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string Title { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [StringLength(50)]
        public string Category { get; set; }

        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        [StringLength(10)]
        public string Time { get; set; }

        [StringLength(100)]
        public string Venue { get; set; }

        [StringLength(500)]
        public string? Image { get; set; }

        [StringLength(30)]
        public string Price { get; set; }

        public bool IsDeleted { get; set; }

        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; }
    }
}
