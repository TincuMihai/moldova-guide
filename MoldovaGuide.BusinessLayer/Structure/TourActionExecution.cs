using MoldovaGuide.BusinessLayer.Core;
using MoldovaGuide.BusinessLayer.Interfaces;
using MoldovaGuide.Domain.Models.Tour;
using MoldovaGuide.Domain.Models.Responses;

namespace MoldovaGuide.BusinessLayer.Structure
{
    public class TourActionExecution : TourActions, ITourAction
    {
        public List<TourDto> GetAllToursAction() => GetAllToursExecution();
        public TourDto? GetTourBySlugAction(string slug) => GetTourBySlugExecution(slug);
        public List<TourDto> GetToursByGuideAction(int guideId) => GetToursByGuideExecution(guideId);
        public ActionResponse CreateTourAction(int guideId, TourCreateDto data) => CreateTourExecution(guideId, data);
        public ActionResponse ToggleTourActiveAction(int id) => ToggleTourActiveExecution(id);
        public ActionResponse DeleteTourAction(int id) => DeleteTourExecution(id);
    }
}
