using MoldovaGuide.Domain.Entities.Booking;
using Microsoft.EntityFrameworkCore;

namespace MoldovaGuide.DataAccess.Context
{
    public class BookingContext : DbContext
    {
        public DbSet<BookingData> Bookings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(DbSession.ConnectionString);
        }
    }
}
