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
            optionsBuilder.UseSqlite(DbSession.ConnectionString);
        }
    }
}
