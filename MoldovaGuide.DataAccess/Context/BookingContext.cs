using MoldovaGuide.Domain.Entities.Booking;
using Microsoft.EntityFrameworkCore;
 
namespace MoldovaGuide.DataAccess.Context
{
    public class BookingContext : DbContext
    {
        public DbSet<BookingData> Bookings { get; set; }
 
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(DbSession.ConnectionString);
        }
 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // N:1 Booking → Tour (Restrict — nu sterge booking-ul la stergerea turului)
            modelBuilder.Entity<BookingData>()
                .HasOne(b => b.Tour)
                .WithMany()
                .HasForeignKey(b => b.TourId)
                .OnDelete(DeleteBehavior.Restrict);
 
            // N:1 Booking → User (Restrict — nu sterge booking-ul la stergerea userului)
            modelBuilder.Entity<BookingData>()
                .HasOne(b => b.User)
                .WithMany()
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
