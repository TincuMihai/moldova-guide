using MoldovaGuide.Domain.Entities.Attraction;
using MoldovaGuide.Domain.Entities.Category;
using Microsoft.EntityFrameworkCore;
 
namespace MoldovaGuide.DataAccess.Context
{
    public class AttractionContext : DbContext
    {
        public DbSet<AttractionData> Attractions { get; set; }
        public DbSet<AttractionImg> AttractionImages { get; set; }
        public DbSet<CategoryData> Categories { get; set; }
 
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(DbSession.ConnectionString);
        }
 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 1:N Attraction → Images (Cascade — sterge imaginile cu atractia)
            modelBuilder.Entity<AttractionData>()
                .HasMany(a => a.Images)
                .WithOne(i => i.Attraction)
                .HasForeignKey(i => i.AttractionId)
                .OnDelete(DeleteBehavior.Cascade);
 
            // Unique index pe Slug
            modelBuilder.Entity<AttractionData>()
                .HasIndex(a => a.Slug)
                .IsUnique();
 
            // Unique index pe Category Slug
            modelBuilder.Entity<CategoryData>()
                .HasIndex(c => c.Slug)
                .IsUnique();
        }
    }
}
