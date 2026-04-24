using MoldovaGuide.DataAccess.Context;
using MoldovaGuide.Domain.Entities.Category;
using MoldovaGuide.Domain.Models.Category;
using MoldovaGuide.Domain.Models.Responses;

namespace MoldovaGuide.BusinessLayer.Core
{
    public class CategoryActions
    {
        protected CategoryActions() { }

        protected List<CategoryDto> GetAllCategoriesExecution()
        {
            using (var db = new AttractionContext()) { return db.Categories.Where(x => !x.IsDeleted).ToList().Select(c => new CategoryDto { Id = c.Id, Slug = c.Slug, Name = c.Name, Color = c.Color, Count = c.Count }).ToList(); }
        }

        protected ActionResponse CreateCategoryExecution(CategoryDto data)
        {
            using (var db = new AttractionContext())
            {
                if (db.Categories.Any(x => x.Slug == data.Slug && !x.IsDeleted))
                    return new ActionResponse { IsSuccess = false, Message = "Category already exists." };
                db.Categories.Add(new CategoryData { Slug = data.Slug, Name = data.Name, Color = data.Color, Count = data.Count });
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Category created." };
        }

        protected ActionResponse DeleteCategoryExecution(int id)
        {
            using (var db = new AttractionContext())
            {
                var e = db.Categories.FirstOrDefault(x => x.Id == id);
                if (e == null) return new ActionResponse { IsSuccess = false, Message = "Category not found." };
                e.IsDeleted = true; db.Categories.Update(e); db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Category deleted." };
        }
    }
}
