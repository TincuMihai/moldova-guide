using MoldovaGuide.DataAccess.Context;
using MoldovaGuide.Domain.Entities.Tour;
using MoldovaGuide.Domain.Models.Tour;
using MoldovaGuide.Domain.Models.Responses;

namespace MoldovaGuide.BusinessLayer.Core
{
    public class TourActions
    {
        protected TourActions() { }

        protected List<TourDto> GetAllToursExecution()
        {
            List<TourData> tours; List<TourImg> imgs; List<TourStopData> stops;
            using (var db = new TourContext())
            {
                tours = db.Tours.Where(x => !x.IsDeleted).ToList();
                imgs = db.TourImages.ToList();
                stops = db.TourStops.ToList();
            }
            // Get guide names
            Dictionary<int, (string name, string avatar)> guides = new();
            using (var udb = new UserContext())
            {
                var guideUsers = udb.Users.Where(u => u.Role == Domain.Entities.User.UserRole.Guide).ToList();
                foreach (var g in guideUsers)
                    guides[g.Id] = (g.Name, g.Avatar ?? "");
            }
            return tours.Select(t => MapToDto(t,
                imgs.Where(i => i.TourId == t.Id).ToList(),
                stops.Where(s => s.TourId == t.Id).OrderBy(s => s.SortOrder).ToList(),
                guides.ContainsKey(t.GuideId) ? guides[t.GuideId] : ("", "")
            )).ToList();
        }

        protected TourDto? GetTourBySlugExecution(string slug)
        {
            TourData? tour; List<TourImg> imgs; List<TourStopData> stops;
            using (var db = new TourContext())
            {
                tour = db.Tours.FirstOrDefault(x => x.Slug == slug && !x.IsDeleted);
                if (tour == null) return null;
                imgs = db.TourImages.Where(i => i.TourId == tour.Id).OrderBy(i => i.SortOrder).ToList();
                stops = db.TourStops.Where(s => s.TourId == tour.Id).OrderBy(s => s.SortOrder).ToList();
            }
            (string name, string avatar) guide = ("", "");
            using (var udb = new UserContext())
            {
                var g = udb.Users.FirstOrDefault(u => u.Id == tour.GuideId);
                if (g != null) guide = (g.Name, g.Avatar ?? "");
            }
            return MapToDto(tour, imgs, stops, guide);
        }

        protected List<TourDto> GetToursByGuideExecution(int guideId)
        {
            return GetAllToursExecution().Where(t => t.Guide.Id == guideId).ToList();
        }

        protected ActionResponse CreateTourExecution(int guideId, TourCreateDto data)
        {
            var slug = data.Title.ToLower()
                .Replace(" ", "-").Replace("ă", "a").Replace("â", "a")
                .Replace("î", "i").Replace("ș", "s").Replace("ț", "t");

            using (var db = new TourContext())
            {
                if (db.Tours.Any(x => x.Slug == slug && !x.IsDeleted))
                    return new ActionResponse { IsSuccess = false, Message = "A tour with this title already exists." };

                var entity = new TourData
                {
                    Title = data.Title, Slug = slug,
                    ShortDescription = data.ShortDescription ?? "",
                    Description = data.Description ?? "",
                    Theme = data.Theme ?? "", Duration = data.Duration ?? "",
                    Difficulty = data.Difficulty ?? "",
                    Language = data.Language != null ? string.Join(",", data.Language) : "",
                    Price = data.Price, Currency = data.Currency ?? "EUR",
                    MaxParticipants = data.MaxParticipants, CurrentParticipants = 0,
                    GuideId = guideId, Rating = 0, ReviewCount = 0,
                    IsFeatured = false, IsActive = true,
                    CreatedAt = DateTime.Now
                };
                db.Tours.Add(entity);
                db.SaveChanges();

                if (data.Images != null)
                {
                    for (int i = 0; i < data.Images.Count; i++)
                        db.TourImages.Add(new TourImg { TourId = entity.Id, ImgUrl = data.Images[i], SortOrder = i });
                    db.SaveChanges();
                }

                if (data.Stops != null)
                {
                    for (int i = 0; i < data.Stops.Count; i++)
                        db.TourStops.Add(new TourStopData
                        {
                            TourId = entity.Id, Name = data.Stops[i].Name,
                            Description = data.Stops[i].Description,
                            Duration = data.Stops[i].Duration ?? "", SortOrder = i
                        });
                    db.SaveChanges();
                }
            }
            return new ActionResponse { IsSuccess = true, Message = "Tour created." };
        }

        protected ActionResponse ToggleTourActiveExecution(int id)
        {
            using (var db = new TourContext())
            {
                var e = db.Tours.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
                if (e == null) return new ActionResponse { IsSuccess = false, Message = "Tour not found." };
                e.IsActive = !e.IsActive;
                db.Tours.Update(e); db.SaveChanges();
                return new ActionResponse { IsSuccess = true, Message = e.IsActive ? "Tour activated." : "Tour deactivated." };
            }
        }

        protected ActionResponse DeleteTourExecution(int id)
        {
            using (var db = new TourContext())
            {
                var e = db.Tours.FirstOrDefault(x => x.Id == id);
                if (e == null) return new ActionResponse { IsSuccess = false, Message = "Tour not found." };
                e.IsDeleted = true; db.Tours.Update(e); db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Tour deleted." };
        }

        private TourDto MapToDto(TourData t, List<TourImg> imgs, List<TourStopData> stops, (string name, string avatar) guide) => new TourDto
        {
            Id = t.Id, Title = t.Title, Slug = t.Slug,
            ShortDescription = t.ShortDescription, Description = t.Description,
            Theme = t.Theme, Duration = t.Duration, Difficulty = t.Difficulty,
            Language = t.Language?.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList() ?? new List<string>(),
            Price = t.Price, Currency = t.Currency,
            MaxParticipants = t.MaxParticipants, CurrentParticipants = t.CurrentParticipants,
            Rating = t.Rating, ReviewCount = t.ReviewCount,
            IsFeatured = t.IsFeatured, IsActive = t.IsActive,
            Images = imgs.OrderBy(i => i.SortOrder).Select(i => i.ImgUrl).ToList(),
            Guide = new TourGuideDto { Id = t.GuideId, Name = guide.name, Avatar = guide.avatar },
            Stops = stops.Select(s => new TourStopDto { Name = s.Name, Description = s.Description, Duration = s.Duration }).ToList()
        };
    }
}
