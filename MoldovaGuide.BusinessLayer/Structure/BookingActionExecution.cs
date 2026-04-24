using MoldovaGuide.BusinessLayer.Core;
using MoldovaGuide.BusinessLayer.Interfaces;
using MoldovaGuide.Domain.Models.Booking;
using MoldovaGuide.Domain.Models.Responses;

namespace MoldovaGuide.BusinessLayer.Structure
{
    public class BookingActionExecution : BookingActions, IBookingAction
    {
        public List<BookingDto> GetBookingsByUserAction(int userId) => GetBookingsByUserExecution(userId);
        public List<BookingDto> GetAllBookingsAction() => GetAllBookingsExecution();
        public ActionResponse CreateBookingAction(int userId, BookingCreateDto data) => CreateBookingExecution(userId, data);
        public ActionResponse UpdateBookingStatusAction(int id, string status) => UpdateBookingStatusExecution(id, status);
        public ActionResponse DeleteBookingAction(int id) => DeleteBookingExecution(id);
    }
}
