using MoldovaGuide.Domain.Entities.Trip;
using MoldovaGuide.Domain.Entities.SavedPlace;
using Microsoft.EntityFrameworkCore;
 
namespace MoldovaGuide.DataAccess.Context
{
    public class TripContext : DbContext
    {
        public DbSet<TripData> Trips { get; set; }
        public DbSet<TripItemData> TripItems { get; set; }
        public DbSet<SavedPlaceData> SavedPlaces { get; set; }
 
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(DbSession.ConnectionString);
        }
 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 1:N Trip → Items (Cascade — sterge itemele cu trip-ul)
            modelBuilder.Entity<TripData>()
                .HasMany(t => t.Items)
                .WithOne(i => i.Trip)
                .HasForeignKey(i => i.TripId)
                .OnDelete(DeleteBehavior.Cascade);
 
            // N:1 Trip → User (Restrict)
            modelBuilder.Entity<TripData>()
                .HasOne(t => t.User)
                .WithMany()
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Restrict);
 
            // N:1 SavedPlace → User (Cascade)
            modelBuilder.Entity<SavedPlaceData>()
                .HasOne(s => s.User)
                .WithMany()
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);
 
            // N:1 SavedPlace → Attraction (Restrict)
            modelBuilder.Entity<SavedPlaceData>()
                .HasOne(s => s.Attraction)
                .WithMany()
                .HasForeignKey(s => s.AttractionId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
