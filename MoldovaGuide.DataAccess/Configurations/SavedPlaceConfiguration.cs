using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoldovaGuide.Domain.Entities.SavedPlace;
 
namespace MoldovaGuide.DataAccess.Configurations
{
    public class SavedPlaceConfiguration : IEntityTypeConfiguration<SavedPlaceData>
    {
        public void Configure(EntityTypeBuilder<SavedPlaceData> builder)
        {
            builder.HasKey(s => s.Id);
 
            // N:1 SavedPlace → User (Cascade)
            builder.HasOne(s => s.User)
                .WithMany(u => u.SavedPlaces)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);
 
            // N:1 SavedPlace → Attraction (Restrict)
            builder.HasOne(s => s.Attraction)
                .WithMany(a => a.SavedPlaces)
                .HasForeignKey(s => s.AttractionId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
