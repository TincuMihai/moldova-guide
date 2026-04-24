using MoldovaGuide.BusinessLayer.Interfaces;
using MoldovaGuide.Domain.Models.Category;
using Microsoft.AspNetCore.Mvc;

namespace MoldovaGuide.Api.Controller
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private ICategoryAction _category;
        public CategoryController() { var bl = new BusinessLayer.BusinessLogic(); _category = bl.CategoryAction(); }

        [HttpGet("getAll")]
        public IActionResult GetAll() => Ok(_category.GetAllCategoriesAction());

        [HttpPost]
        public IActionResult Create([FromBody] CategoryDto data) => Ok(_category.CreateCategoryAction(data));

        [HttpDelete("{id}")]
        public IActionResult Delete(int id) => Ok(_category.DeleteCategoryAction(id));
    }
}
