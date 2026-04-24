using MoldovaGuide.Domain.Models.Review;
using MoldovaGuide.Domain.Models.Responses;

namespace MoldovaGuide.BusinessLayer.Interfaces
{
    public interface IReviewAction
    {
        List<ReviewDto> GetReviewsByAttractionAction(int attractionId);
        List<ReviewDto> GetReviewsByTourAction(int tourId);
        ActionResponse CreateReviewAction(int userId, ReviewCreateDto data);
        ActionResponse DeleteReviewAction(int id);
    }
}
