using MoldovaGuide.BusinessLayer.Core;
using MoldovaGuide.BusinessLayer.Interfaces;
using MoldovaGuide.Domain.Models.Responses;
using MoldovaGuide.Domain.Models.User;

namespace MoldovaGuide.BusinessLayer.Structure
{
    public class UserRegActionExecution : UserActions, IUserRegAction
    {
        public ActionResponse UserRegDataValidation(UserRegisterDto uReg) { return UserRegDataValidationAction(uReg); }
    }
}
