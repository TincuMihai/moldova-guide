using MoldovaGuide.Domain.Entities.Review;
using Microsoft.EntityFrameworkCore;
 
namespace MoldovaGuide.DataAccess.Context
{
    public class ReviewContext : DbContext
    {
        public DbSet<ReviewData> Reviews { get; set; }
 
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(DbSession.ConnectionString);
        }
 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // N:1 Review → User (Cascade — sterge review-urile la stergerea userului)
            modelBuilder.Entity<ReviewData>()
                .HasOne(r => r.User)
                .WithMany()
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);
 
            // N:1 Review → Tour (optional, SetNull)
            modelBuilder.Entity<ReviewData>()
                .HasOne(r => r.Tour)
                .WithMany()
                .HasForeignKey(r => r.TourId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.SetNull);
 
            // N:1 Review → Attraction (optional, SetNull)
            modelBuilder.Entity<ReviewData>()
                .HasOne(r => r.Attraction)
                .WithMany()
                .HasForeignKey(r => r.AttractionId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
