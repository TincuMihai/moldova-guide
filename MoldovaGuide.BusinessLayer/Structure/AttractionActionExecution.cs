using MoldovaGuide.BusinessLayer.Core;
using MoldovaGuide.BusinessLayer.Interfaces;
using MoldovaGuide.Domain.Models.Attraction;
using MoldovaGuide.Domain.Models.Responses;

namespace MoldovaGuide.BusinessLayer.Structure
{
    public class AttractionActionExecution : AttractionActions, IAttractionAction
    {
        public List<AttractionDto> GetAllAttractionsAction() => GetAllAttractionsExecution();
        public List<AttractionDto> GetFeaturedAttractionsAction() => GetFeaturedAttractionsExecution();
        public AttractionDto? GetAttractionBySlugAction(string slug) => GetAttractionBySlugExecution(slug);
        public ActionResponse CreateAttractionAction(AttractionCreateDto data) => CreateAttractionExecution(data);
        public ActionResponse UpdateAttractionAction(int id, AttractionCreateDto data) => UpdateAttractionExecution(id, data);
        public ActionResponse DeleteAttractionAction(int id) => DeleteAttractionExecution(id);
    }
}
