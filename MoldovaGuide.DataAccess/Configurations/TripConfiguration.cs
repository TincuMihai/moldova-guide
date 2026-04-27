using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoldovaGuide.Domain.Entities.Trip;
 
namespace MoldovaGuide.DataAccess.Configurations
{
    public class TripConfiguration : IEntityTypeConfiguration<TripData>
    {
        public void Configure(EntityTypeBuilder<TripData> builder)
        {
            builder.HasKey(t => t.Id);
 
            builder.Property(t => t.Title).IsRequired().HasMaxLength(100);
 
            // 1:N Trip → Items (Cascade)
            builder.HasMany(t => t.Items)
                .WithOne(i => i.Trip)
                .HasForeignKey(i => i.TripId)
                .OnDelete(DeleteBehavior.Cascade);
 
            // N:1 Trip → User (Restrict)
            builder.HasOne(t => t.User)
                .WithMany(u => u.Trips)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
