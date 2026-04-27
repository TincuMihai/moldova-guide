using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoldovaGuide.Domain.Entities.Attraction;
 
namespace MoldovaGuide.DataAccess.Configurations
{
    public class AttractionConfiguration : IEntityTypeConfiguration<AttractionData>
    {
        public void Configure(EntityTypeBuilder<AttractionData> builder)
        {
            builder.HasKey(a => a.Id);
 
            builder.Property(a => a.Name).IsRequired().HasMaxLength(100);
            builder.Property(a => a.Slug).IsRequired().HasMaxLength(100);
 
            builder.HasIndex(a => a.Slug).IsUnique();
 
            // 1:N Attraction → Images (Cascade)
            builder.HasMany(a => a.Images)
                .WithOne(i => i.Attraction)
                .HasForeignKey(i => i.AttractionId)
                .OnDelete(DeleteBehavior.Cascade);
 
            // 1:N Attraction → Reviews (SetNull, optional)
            builder.HasMany(a => a.Reviews)
                .WithOne(r => r.Attraction)
                .HasForeignKey(r => r.AttractionId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.SetNull);
 
            // 1:N Attraction → SavedPlaces (Cascade)
            builder.HasMany(a => a.SavedPlaces)
                .WithOne(s => s.Attraction)
                .HasForeignKey(s => s.AttractionId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
