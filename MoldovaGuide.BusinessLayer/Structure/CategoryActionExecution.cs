using MoldovaGuide.BusinessLayer.Core;
using MoldovaGuide.BusinessLayer.Interfaces;
using MoldovaGuide.Domain.Models.Category;
using MoldovaGuide.Domain.Models.Responses;

namespace MoldovaGuide.BusinessLayer.Structure
{
    public class CategoryActionExecution : CategoryActions, ICategoryAction
    {
        public List<CategoryDto> GetAllCategoriesAction() => GetAllCategoriesExecution();
        public ActionResponse CreateCategoryAction(CategoryDto data) => CreateCategoryExecution(data);
        public ActionResponse DeleteCategoryAction(int id) => DeleteCategoryExecution(id);
    }
}
