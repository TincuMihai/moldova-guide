using MoldovaGuide.BusinessLayer.Core;
using MoldovaGuide.BusinessLayer.Interfaces;
using MoldovaGuide.Domain.Models.Review;
using MoldovaGuide.Domain.Models.Responses;

namespace MoldovaGuide.BusinessLayer.Structure
{
    public class ReviewActionExecution : ReviewActions, IReviewAction
    {
        public List<ReviewDto> GetReviewsByAttractionAction(int attractionId) => GetReviewsByAttractionExecution(attractionId);
        public List<ReviewDto> GetReviewsByTourAction(int tourId) => GetReviewsByTourExecution(tourId);
        public ActionResponse CreateReviewAction(int userId, ReviewCreateDto data) => CreateReviewExecution(userId, data);
        public ActionResponse DeleteReviewAction(int id) => DeleteReviewExecution(id);
    }
}
