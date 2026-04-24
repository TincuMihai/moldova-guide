using MoldovaGuide.BusinessLayer.Core;
using MoldovaGuide.BusinessLayer.Interfaces;
using MoldovaGuide.Domain.Models.User;

namespace MoldovaGuide.BusinessLayer.Structure
{
    public class UserAuthAction : UserActions, IUserLoginAction
    {
        public object UserLoginDataValidation(UserLoginDto udata)
        {
            var isValid = UserLoginDataValidationExecution(udata);
            if (isValid) { var token = UserTokenGeneration(udata); var user = GetUserAfterLogin(udata); return new { Token = token, User = user }; }
            return null;
        }
    }
}
