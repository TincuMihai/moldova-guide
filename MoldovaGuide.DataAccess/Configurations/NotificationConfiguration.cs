using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoldovaGuide.Domain.Entities.Notification;
 
namespace MoldovaGuide.DataAccess.Configurations
{
    public class NotificationConfiguration : IEntityTypeConfiguration<NotificationData>
    {
        public void Configure(EntityTypeBuilder<NotificationData> builder)
        {
            builder.HasKey(n => n.Id);
 
            builder.Property(n => n.Text).IsRequired().HasMaxLength(500);
 
            // N:1 Notification → User
            builder.HasOne(n => n.User)
                .WithMany(u => u.Notifications)
                .HasForeignKey(n => n.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
