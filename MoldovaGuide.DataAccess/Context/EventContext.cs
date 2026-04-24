using MoldovaGuide.Domain.Entities.Event;
using Microsoft.EntityFrameworkCore;

namespace MoldovaGuide.DataAccess.Context
{
    public class EventContext : DbContext
    {
        public DbSet<EventData> Events { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(DbSession.ConnectionString);
        }
    }
}
