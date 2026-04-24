using MoldovaGuide.BusinessLayer.Structure;
using MoldovaGuide.DataAccess.Context;
using MoldovaGuide.Domain.Entities.User;
using MoldovaGuide.Domain.Models.Responses;
using MoldovaGuide.Domain.Models.User;

namespace MoldovaGuide.BusinessLayer.Core
{
    public class UserActions
    {
        public UserActions() { }

        internal bool UserLoginDataValidationExecution(UserLoginDto udata)
        {
            if (string.IsNullOrWhiteSpace(udata.Email) || string.IsNullOrWhiteSpace(udata.Password))
                return false;

            UserData? user;
            using (var db = new UserContext())
            {
                user = db.Users.FirstOrDefault(x =>
                    x.Email == udata.Email &&
                    x.Password == udata.Password &&
                    !x.IsBlocked);
            }
            return user != null;
        }

        internal UserDto? GetUserAfterLogin(UserLoginDto udata)
        {
            UserData? user;
            using (var db = new UserContext())
            {
                user = db.Users.FirstOrDefault(x =>
                    x.Email == udata.Email &&
                    x.Password == udata.Password &&
                    !x.IsBlocked);
            }
            if (user == null) return null;
            return MapToDto(user);
        }

        internal string UserTokenGeneration(UserLoginDto udata)
        {
            var token = new TokenService();
            return token.GenerateToken();
        }

        internal ActionResponse UserRegDataValidationAction(UserRegisterDto uReg)
        {
            // Validate name
            var nameCheck = ValidationHelper.ValidateRequired(uReg.Name, "Numele", 60);
            if (!nameCheck.isValid)
                return new ActionResponse { IsSuccess = false, Message = nameCheck.error };

            // Validate email
            var emailCheck = ValidationHelper.ValidateEmail(uReg.Email);
            if (!emailCheck.isValid)
                return new ActionResponse { IsSuccess = false, Message = emailCheck.error };

            // Validate password
            var passCheck = ValidationHelper.ValidatePassword(uReg.Password);
            if (!passCheck.isValid)
                return new ActionResponse { IsSuccess = false, Message = passCheck.error };

            // Check duplicate email
            UserData? existing;
            using (var db = new UserContext())
            {
                existing = db.Users.FirstOrDefault(x => x.Email == uReg.Email);
            }
            if (existing != null)
                return new ActionResponse { IsSuccess = false, Message = "Acest email este deja înregistrat." };

            var role = uReg.Role?.ToLower() switch
            {
                "guide" => UserRole.Guide,
                "admin" => UserRole.Admin,
                _ => UserRole.Tourist
            };

            var user = new UserData
            {
                Name = uReg.Name,
                Email = uReg.Email,
                Password = uReg.Password,
                Role = role,
                Avatar = $"https://ui-avatars.com/api/?name={Uri.EscapeDataString(uReg.Name)}&background=ec751c&color=fff&size=150",
                RegisteredOn = DateTime.Now
            };

            using (var db = new UserContext())
            {
                db.Users.Add(user);
                db.SaveChanges();
            }

            return new ActionResponse { IsSuccess = true, Message = "Înregistrare reușită." };
        }

        internal UserDto? GetUserByIdExecution(int id)
        {
            UserData? user;
            using (var db = new UserContext())
            {
                user = db.Users.FirstOrDefault(x => x.Id == id);
            }
            return user == null ? null : MapToDto(user);
        }

        internal List<UserDto> GetAllUsersExecution()
        {
            List<UserData> users;
            using (var db = new UserContext())
            {
                users = db.Users.ToList();
            }
            return users.Select(MapToDto).ToList();
        }

        internal ActionResponse UpdateProfileExecution(int userId, UserProfileUpdateDto data)
        {
            using (var db = new UserContext())
            {
                var user = db.Users.FirstOrDefault(x => x.Id == userId);
                if (user == null)
                    return new ActionResponse { IsSuccess = false, Message = "Utilizatorul nu a fost găsit." };

                if (data.Name != null)
                {
                    var check = ValidationHelper.ValidateRequired(data.Name, "Numele", 60);
                    if (!check.isValid)
                        return new ActionResponse { IsSuccess = false, Message = check.error };
                    user.Name = data.Name;
                }
                if (data.Phone != null) user.Phone = data.Phone;
                if (data.Bio != null) user.Bio = data.Bio;
                if (data.Languages != null) user.Languages = data.Languages;
                if (data.Avatar != null) user.Avatar = data.Avatar;

                db.Users.Update(user);
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Profilul a fost actualizat." };
        }

        internal ActionResponse BlockUserExecution(int id)
        {
            using (var db = new UserContext())
            {
                var user = db.Users.FirstOrDefault(x => x.Id == id);
                if (user == null)
                    return new ActionResponse { IsSuccess = false, Message = "Utilizatorul nu a fost găsit." };

                user.IsBlocked = !user.IsBlocked;
                db.Users.Update(user);
                db.SaveChanges();
                return new ActionResponse
                {
                    IsSuccess = true,
                    Message = user.IsBlocked ? "Utilizatorul a fost blocat." : "Utilizatorul a fost deblocat."
                };
            }
        }

        internal ActionResponse DeleteUserExecution(int id)
        {
            using (var db = new UserContext())
            {
                var user = db.Users.FirstOrDefault(x => x.Id == id);
                if (user == null)
                    return new ActionResponse { IsSuccess = false, Message = "Utilizatorul nu a fost găsit." };

                db.Users.Remove(user);
                db.SaveChanges();
                return new ActionResponse { IsSuccess = true, Message = "Utilizatorul a fost șters." };
            }
        }

        private UserDto MapToDto(UserData u) => new UserDto
        {
            Id = u.Id, Name = u.Name, Email = u.Email, Avatar = u.Avatar,
            Phone = u.Phone, Bio = u.Bio, Languages = u.Languages,
            Role = u.Role.ToString().ToLower(),
            RegisteredOn = u.RegisteredOn.ToString("yyyy-MM-dd")
        };
    }
}
