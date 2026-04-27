using MoldovaGuide.Domain.Entities.Notification;
using Microsoft.EntityFrameworkCore;
 
namespace MoldovaGuide.DataAccess.Context
{
    public class NotificationContext : DbContext
    {
        public DbSet<NotificationData> Notifications { get; set; }
 
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(DbSession.ConnectionString);
        }
 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // N:1 Notification → User (Cascade — sterge notificarile la stergerea userului)
            modelBuilder.Entity<NotificationData>()
                .HasOne(n => n.User)
                .WithMany()
                .HasForeignKey(n => n.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
