using MoldovaGuide.Domain.Models.Responses;
using MoldovaGuide.Domain.Models.User;

namespace MoldovaGuide.BusinessLayer.Interfaces
{
    public interface IUserRegAction
    {
        public ActionResponse UserRegDataValidation(UserRegisterDto uReg);
    }
}
