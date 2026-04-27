using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoldovaGuide.Domain.Entities.Booking;
 
namespace MoldovaGuide.DataAccess.Configurations
{
    public class BookingConfiguration : IEntityTypeConfiguration<BookingData>
    {
        public void Configure(EntityTypeBuilder<BookingData> builder)
        {
            builder.HasKey(b => b.Id);
 
            builder.Property(b => b.Status).IsRequired().HasMaxLength(20);
 
            // N:1 Booking → Tour (Restrict)
            builder.HasOne(b => b.Tour)
                .WithMany(t => t.Bookings)
                .HasForeignKey(b => b.TourId)
                .OnDelete(DeleteBehavior.Restrict);
 
            // N:1 Booking → User (Restrict)
            builder.HasOne(b => b.User)
                .WithMany(u => u.Bookings)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
