using MoldovaGuide.Domain.Models.Category;
using MoldovaGuide.Domain.Models.Responses;

namespace MoldovaGuide.BusinessLayer.Interfaces
{
    public interface ICategoryAction
    {
        List<CategoryDto> GetAllCategoriesAction();
        ActionResponse CreateCategoryAction(CategoryDto data);
        ActionResponse DeleteCategoryAction(int id);
    }
}
