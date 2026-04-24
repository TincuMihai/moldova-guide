using MoldovaGuide.Domain.Models.User;

namespace MoldovaGuide.BusinessLayer.Interfaces
{
    public interface IUserLoginAction
    {
        public object UserLoginDataValidation(UserLoginDto udata);
    }
}
