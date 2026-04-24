using MoldovaGuide.Domain.Models.Tour;
using MoldovaGuide.Domain.Models.Responses;

namespace MoldovaGuide.BusinessLayer.Interfaces
{
    public interface ITourAction
    {
        List<TourDto> GetAllToursAction();
        TourDto? GetTourBySlugAction(string slug);
        List<TourDto> GetToursByGuideAction(int guideId);
        ActionResponse CreateTourAction(int guideId, TourCreateDto data);
        ActionResponse ToggleTourActiveAction(int id);
        ActionResponse DeleteTourAction(int id);
    }
}
