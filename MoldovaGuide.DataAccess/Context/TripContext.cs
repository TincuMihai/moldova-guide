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
    }
}
