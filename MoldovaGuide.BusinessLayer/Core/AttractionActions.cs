using MoldovaGuide.DataAccess.Context;
using MoldovaGuide.Domain.Entities.Attraction;
using MoldovaGuide.Domain.Models.Attraction;
using MoldovaGuide.Domain.Models.Responses;

namespace MoldovaGuide.BusinessLayer.Core
{
    public class AttractionActions
    {
        protected AttractionActions() { }

        protected List<AttractionDto> GetAllAttractionsExecution()
        {
            List<AttractionData> data; List<AttractionImg> imgs;
            using (var db = new AttractionContext()) { data = db.Attractions.Where(x => !x.IsDeleted).ToList(); imgs = db.AttractionImages.ToList(); }
            return data.Select(a => MapToDto(a, imgs.Where(i => i.AttractionId == a.Id).ToList())).ToList();
        }

        protected List<AttractionDto> GetFeaturedAttractionsExecution()
        {
            List<AttractionData> data; List<AttractionImg> imgs;
            using (var db = new AttractionContext()) { data = db.Attractions.Where(x => !x.IsDeleted && x.IsFeatured).ToList(); imgs = db.AttractionImages.ToList(); }
            return data.Select(a => MapToDto(a, imgs.Where(i => i.AttractionId == a.Id).ToList())).ToList();
        }

        protected AttractionDto? GetAttractionBySlugExecution(string slug)
        {
            AttractionData? a; List<AttractionImg> imgs;
            using (var db = new AttractionContext()) { a = db.Attractions.FirstOrDefault(x => x.Slug == slug && !x.IsDeleted); imgs = a != null ? db.AttractionImages.Where(i => i.AttractionId == a.Id).OrderBy(i => i.SortOrder).ToList() : new List<AttractionImg>(); }
            return a == null ? null : MapToDto(a, imgs);
        }

        protected ActionResponse CreateAttractionExecution(AttractionCreateDto data)
        {
            var slug = data.Name.ToLower().Replace(" ", "-").Replace("ă", "a").Replace("â", "a").Replace("î", "i").Replace("ș", "s").Replace("ț", "t");
            using (var db = new AttractionContext())
            {
                if (db.Attractions.Any(x => x.Slug == slug && !x.IsDeleted))
                    return new ActionResponse { IsSuccess = false, Message = "Attraction with this name already exists." };
                var entity = new AttractionData { Name = data.Name, Slug = slug, ShortDescription = data.ShortDescription, Description = data.Description, Category = data.Category, City = data.City, Address = data.Address, OpeningHours = data.OpeningHours, PriceLevel = data.PriceLevel, Phone = data.Phone, Website = data.Website, Tags = data.Tags != null ? string.Join(",", data.Tags) : null, Rating = 0, ReviewCount = 0, CreatedAt = DateTime.Now };
                db.Attractions.Add(entity); db.SaveChanges();
                if (data.Images != null)
                {
                    for (int i = 0; i < data.Images.Count; i++)
                        db.AttractionImages.Add(new AttractionImg { AttractionId = entity.Id, ImgUrl = data.Images[i], SortOrder = i });
                    db.SaveChanges();
                }
            }
            return new ActionResponse { IsSuccess = true, Message = "Attraction created." };
        }

        protected ActionResponse UpdateAttractionExecution(int id, AttractionCreateDto data)
        {
            using (var db = new AttractionContext())
            {
                var e = db.Attractions.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
                if (e == null) return new ActionResponse { IsSuccess = false, Message = "Attraction not found." };
                e.Name = data.Name; e.ShortDescription = data.ShortDescription; e.Description = data.Description; e.Category = data.Category; e.City = data.City; e.Address = data.Address; e.OpeningHours = data.OpeningHours; e.PriceLevel = data.PriceLevel; e.Phone = data.Phone; e.Website = data.Website; e.Tags = data.Tags != null ? string.Join(",", data.Tags) : null; e.UpdatedAt = DateTime.Now;
                db.Attractions.Update(e); db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Attraction updated." };
        }

        protected ActionResponse DeleteAttractionExecution(int id)
        {
            using (var db = new AttractionContext())
            {
                var e = db.Attractions.FirstOrDefault(x => x.Id == id);
                if (e == null) return new ActionResponse { IsSuccess = false, Message = "Attraction not found." };
                e.IsDeleted = true; db.Attractions.Update(e); db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Attraction deleted." };
        }

        private AttractionDto MapToDto(AttractionData a, List<AttractionImg> imgs) => new AttractionDto
        {
            Id = a.Id, Name = a.Name, Slug = a.Slug, ShortDescription = a.ShortDescription, Description = a.Description, Category = a.Category, City = a.City, Address = a.Address, OpeningHours = a.OpeningHours, PriceLevel = a.PriceLevel, Phone = a.Phone, Website = a.Website, Rating = a.Rating, ReviewCount = a.ReviewCount, IsFeatured = a.IsFeatured,
            Tags = a.Tags?.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList() ?? new List<string>(),
            Images = imgs.OrderBy(i => i.SortOrder).Select(i => i.ImgUrl).ToList()
        };
    }
}
