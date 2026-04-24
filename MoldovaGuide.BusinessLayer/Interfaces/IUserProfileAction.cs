using MoldovaGuide.Domain.Models.Responses;
using MoldovaGuide.Domain.Models.User;

namespace MoldovaGuide.BusinessLayer.Interfaces
{
    public interface IUserProfileAction
    {
        UserDto? GetUserByIdAction(int id);
        List<UserDto> GetAllUsersAction();
        ActionResponse UpdateProfileAction(int userId, UserProfileUpdateDto data);
        ActionResponse BlockUserAction(int id);
        ActionResponse DeleteUserAction(int id);
    }
}
