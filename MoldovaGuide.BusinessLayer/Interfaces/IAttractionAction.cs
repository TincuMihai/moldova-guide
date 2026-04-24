using MoldovaGuide.Domain.Models.Attraction;
using MoldovaGuide.Domain.Models.Responses;

namespace MoldovaGuide.BusinessLayer.Interfaces
{
    public interface IAttractionAction
    {
        List<AttractionDto> GetAllAttractionsAction();
        List<AttractionDto> GetFeaturedAttractionsAction();
        AttractionDto? GetAttractionBySlugAction(string slug);
        ActionResponse CreateAttractionAction(AttractionCreateDto data);
        ActionResponse UpdateAttractionAction(int id, AttractionCreateDto data);
        ActionResponse DeleteAttractionAction(int id);
    }
}
