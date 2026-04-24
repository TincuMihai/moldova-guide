using MoldovaGuide.Domain.Models.Booking;
using MoldovaGuide.Domain.Models.Responses;

namespace MoldovaGuide.BusinessLayer.Interfaces
{
    public interface IBookingAction
    {
        List<BookingDto> GetBookingsByUserAction(int userId);
        List<BookingDto> GetAllBookingsAction();
        ActionResponse CreateBookingAction(int userId, BookingCreateDto data);
        ActionResponse UpdateBookingStatusAction(int id, string status);
        ActionResponse DeleteBookingAction(int id);
    }
}
