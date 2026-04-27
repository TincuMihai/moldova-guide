using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoldovaGuide.Domain.Entities.Review;
 
namespace MoldovaGuide.DataAccess.Configurations
{
    public class ReviewConfiguration : IEntityTypeConfiguration<ReviewData>
    {
        public void Configure(EntityTypeBuilder<ReviewData> builder)
        {
            builder.HasKey(r => r.Id);
 
            builder.Property(r => r.Comment).IsRequired().HasMaxLength(1000);
 
            // N:1 Review → User (Cascade)
            builder.HasOne(r => r.User)
                .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);
 
            // N:1 Review → Tour (optional, SetNull)
            builder.HasOne(r => r.Tour)
                .WithMany(t => t.TourReviews)
                .HasForeignKey(r => r.TourId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.SetNull);
 
            // N:1 Review → Attraction (optional, SetNull)
            builder.HasOne(r => r.Attraction)
                .WithMany(a => a.Reviews)
                .HasForeignKey(r => r.AttractionId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
