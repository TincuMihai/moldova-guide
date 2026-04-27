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
    }
}
