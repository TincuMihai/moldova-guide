using MoldovaGuide.Domain.Entities.Tour;
using Microsoft.EntityFrameworkCore;
 
namespace MoldovaGuide.DataAccess.Context
{
    public class TourContext : DbContext
    {
        public DbSet<TourData> Tours { get; set; }
        public DbSet<TourImg> TourImages { get; set; }
        public DbSet<TourStopData> TourStops { get; set; }
 
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(DbSession.ConnectionString);
        }
 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 1:N Tour → Images (Cascade — sterge imaginile cu turul)
            modelBuilder.Entity<TourData>()
                .HasMany(t => t.Images)
                .WithOne(i => i.Tour)
                .HasForeignKey(i => i.TourId)
                .OnDelete(DeleteBehavior.Cascade);
 
            // 1:N Tour → Stops (Cascade — sterge opririle cu turul)
            modelBuilder.Entity<TourData>()
                .HasMany(t => t.Stops)
                .WithOne(s => s.Tour)
                .HasForeignKey(s => s.TourId)
                .OnDelete(DeleteBehavior.Cascade);
 
            // N:1 Tour → Guide (Restrict — nu sterge turul la stergerea ghidului)
            modelBuilder.Entity<TourData>()
                .HasOne(t => t.Guide)
                .WithMany()
                .HasForeignKey(t => t.GuideId)
                .OnDelete(DeleteBehavior.Restrict);
 
            // Unique index pe Slug
            modelBuilder.Entity<TourData>()
                .HasIndex(t => t.Slug)
                .IsUnique();
        }
    }
}
