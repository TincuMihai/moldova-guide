using MoldovaGuide.DataAccess.Context;
using MoldovaGuide.Domain.Entities.Review;
using MoldovaGuide.Domain.Models.Review;
using MoldovaGuide.Domain.Models.Responses;

namespace MoldovaGuide.BusinessLayer.Core
{
    public class ReviewActions
    {
        protected ReviewActions() { }

        protected List<ReviewDto> GetReviewsByAttractionExecution(int attractionId)
        {
            using (var db = new ReviewContext()) { return db.Reviews.Where(x => x.AttractionId == attractionId && !x.IsDeleted).ToList().Select(MapToDto).ToList(); }
        }

        protected List<ReviewDto> GetReviewsByTourExecution(int tourId)
        {
            using (var db = new ReviewContext()) { return db.Reviews.Where(x => x.TourId == tourId && !x.IsDeleted).ToList().Select(MapToDto).ToList(); }
        }

        protected ActionResponse CreateReviewExecution(int userId, ReviewCreateDto data)
        {
            using (var db = new ReviewContext())
            {
                db.Reviews.Add(new ReviewData { UserId = userId, TourId = data.TourId, AttractionId = data.AttractionId, Rating = data.Rating, Comment = data.Comment, CreatedAt = DateTime.Now });
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Review created." };
        }

        protected ActionResponse DeleteReviewExecution(int id)
        {
            using (var db = new ReviewContext())
            {
                var e = db.Reviews.FirstOrDefault(x => x.Id == id);
                if (e == null) return new ActionResponse { IsSuccess = false, Message = "Review not found." };
                e.IsDeleted = true; db.Reviews.Update(e); db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Review deleted." };
        }

        private ReviewDto MapToDto(ReviewData r) => new ReviewDto { Id = r.Id, Author = "", Avatar = null, Rating = r.Rating, Comment = r.Comment, Date = r.CreatedAt.ToString("yyyy-MM-dd"), TourId = r.TourId, AttractionId = r.AttractionId };
    }
}
