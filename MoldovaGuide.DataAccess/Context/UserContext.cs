using MoldovaGuide.Domain.Entities.User;
using Microsoft.EntityFrameworkCore;
 
namespace MoldovaGuide.DataAccess.Context
{
    public class UserContext : DbContext
    {
        public DbSet<UserData> Users { get; set; }
 
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(DbSession.ConnectionString);
        }
 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserData>(entity =>
            {
                entity.HasKey(u => u.Id);
 
                entity.Property(u => u.Name).IsRequired().HasMaxLength(60);
                entity.Property(u => u.Email).IsRequired().HasMaxLength(80);
                entity.Property(u => u.Password).IsRequired().HasMaxLength(60);
 
                entity.HasIndex(u => u.Email).IsUnique();
            });
        }
    }
}
