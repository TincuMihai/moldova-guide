using MoldovaGuide.BusinessLayer.Core;
using MoldovaGuide.BusinessLayer.Interfaces;
using MoldovaGuide.Domain.Models.Responses;
using MoldovaGuide.Domain.Models.User;

namespace MoldovaGuide.BusinessLayer.Structure
{
    public class UserProfileActionExecution : UserActions, IUserProfileAction
    {
        public UserDto? GetUserByIdAction(int id) => GetUserByIdExecution(id);
        public List<UserDto> GetAllUsersAction() => GetAllUsersExecution();
        public ActionResponse UpdateProfileAction(int userId, UserProfileUpdateDto data) => UpdateProfileExecution(userId, data);
        public ActionResponse BlockUserAction(int id) => BlockUserExecution(id);
        public ActionResponse DeleteUserAction(int id) => DeleteUserExecution(id);
    }
}
