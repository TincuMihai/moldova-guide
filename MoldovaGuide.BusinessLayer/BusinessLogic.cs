using MoldovaGuide.BusinessLayer.Interfaces;
using MoldovaGuide.BusinessLayer.Structure;

namespace MoldovaGuide.BusinessLayer
{
    public class BusinessLogic
    {
        public BusinessLogic() { }

        public IUserLoginAction UserLoginAction() => new UserAuthAction();
        public IUserRegAction UserRegAction() => new UserRegActionExecution();
        public IUserProfileAction UserProfileAction() => new UserProfileActionExecution();
        public IAttractionAction AttractionAction() => new AttractionActionExecution();
        public IBookingAction BookingAction() => new BookingActionExecution();
        public IReviewAction ReviewAction() => new ReviewActionExecution();
        public ITourAction TourAction() => new TourActionExecution();
        public IEventAction EventAction() => new EventActionExecution();
        public ICategoryAction CategoryAction() => new CategoryActionExecution();
    }
}
