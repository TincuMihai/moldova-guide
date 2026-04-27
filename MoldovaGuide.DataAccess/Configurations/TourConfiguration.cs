using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoldovaGuide.Domain.Entities.Tour;
 
namespace MoldovaGuide.DataAccess.Configurations
{
    public class TourConfiguration : IEntityTypeConfiguration<TourData>
    {
        public void Configure(EntityTypeBuilder<TourData> builder)
        {
            builder.HasKey(t => t.Id);
 
            builder.Property(t => t.Title).IsRequired().HasMaxLength(150);
            builder.Property(t => t.Slug).IsRequired().HasMaxLength(150);
 
            builder.HasIndex(t => t.Slug).IsUnique();
 
            // 1:N Tour → Images (Cascade)
            builder.HasMany(t => t.Images)
                .WithOne(i => i.Tour)
                .HasForeignKey(i => i.TourId)
                .OnDelete(DeleteBehavior.Cascade);
 
            // 1:N Tour → Stops (Cascade)
            builder.HasMany(t => t.Stops)
                .WithOne(s => s.Tour)
                .HasForeignKey(s => s.TourId)
                .OnDelete(DeleteBehavior.Cascade);
 
            // 1:N Tour → Bookings (Restrict)
            builder.HasMany(t => t.Bookings)
                .WithOne(b => b.Tour)
                .HasForeignKey(b => b.TourId)
                .OnDelete(DeleteBehavior.Restrict);
 
            // 1:N Tour → Reviews (SetNull, optional)
            builder.HasMany(t => t.TourReviews)
                .WithOne(r => r.Tour)
                .HasForeignKey(r => r.TourId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.SetNull);
 
            // N:1 Tour → Guide (Restrict)
            builder.HasOne(t => t.Guide)
                .WithMany(u => u.GuidedTours)
                .HasForeignKey(t => t.GuideId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
