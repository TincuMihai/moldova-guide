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
            optionsBuilder.UseSqlServer(DbSession.ConnectionString);
        }
    }
}
