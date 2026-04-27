using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoldovaGuide.Domain.Entities.User;
 
namespace MoldovaGuide.DataAccess.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<UserData>
    {
        public void Configure(EntityTypeBuilder<UserData> builder)
        {
            builder.HasKey(u => u.Id);
 
            builder.Property(u => u.Name).IsRequired().HasMaxLength(60);
            builder.Property(u => u.Email).IsRequired().HasMaxLength(80);
            builder.Property(u => u.Password).IsRequired().HasMaxLength(60);
 
            builder.HasIndex(u => u.Email).IsUnique();
 
            // 1:N User → Bookings
            builder.HasMany(u => u.Bookings)
                .WithOne(b => b.User)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Restrict);
 
            // 1:N User → Reviews
            builder.HasMany(u => u.Reviews)
                .WithOne(r => r.User)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);
 
            // 1:N User → Notifications
            builder.HasMany(u => u.Notifications)
                .WithOne(n => n.User)
                .HasForeignKey(n => n.UserId)
                .OnDelete(DeleteBehavior.Cascade);
 
            // 1:N User → SavedPlaces
            builder.HasMany(u => u.SavedPlaces)
                .WithOne(s => s.User)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);
 
            // 1:N User → Trips
            builder.HasMany(u => u.Trips)
                .WithOne(t => t.User)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Cascade);
 
            // 1:N User (Guide) → Tours
            builder.HasMany(u => u.GuidedTours)
                .WithOne(t => t.Guide)
                .HasForeignKey(t => t.GuideId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
