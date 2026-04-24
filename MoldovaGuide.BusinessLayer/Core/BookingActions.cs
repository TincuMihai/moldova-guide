using MoldovaGuide.DataAccess.Context;
using MoldovaGuide.Domain.Entities.Booking;
using MoldovaGuide.Domain.Models.Booking;
using MoldovaGuide.Domain.Models.Responses;

namespace MoldovaGuide.BusinessLayer.Core
{
    public class BookingActions
    {
        protected BookingActions() { }

        protected List<BookingDto> GetBookingsByUserExecution(int userId)
        {
            using (var db = new BookingContext()) { return db.Bookings.Where(x => x.UserId == userId && !x.IsDeleted).ToList().Select(MapToDto).ToList(); }
        }

        protected List<BookingDto> GetAllBookingsExecution()
        {
            using (var db = new BookingContext()) { return db.Bookings.Where(x => !x.IsDeleted).ToList().Select(MapToDto).ToList(); }
        }

        protected ActionResponse CreateBookingExecution(int userId, BookingCreateDto data)
        {
            using (var db = new BookingContext())
            {
                db.Bookings.Add(new BookingData { TourId = data.TourId, UserId = userId, Status = "pending", Date = DateTime.Parse(data.Date), Participants = data.Participants, TotalPrice = 0, Currency = "EUR", CreatedAt = DateTime.Now });
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Booking created." };
        }

        protected ActionResponse UpdateBookingStatusExecution(int id, string status)
        {
            using (var db = new BookingContext())
            {
                var e = db.Bookings.FirstOrDefault(x => x.Id == id);
                if (e == null) return new ActionResponse { IsSuccess = false, Message = "Booking not found." };
                e.Status = status; db.Bookings.Update(e); db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Status updated." };
        }

        protected ActionResponse DeleteBookingExecution(int id)
        {
            using (var db = new BookingContext())
            {
                var e = db.Bookings.FirstOrDefault(x => x.Id == id);
                if (e == null) return new ActionResponse { IsSuccess = false, Message = "Booking not found." };
                e.IsDeleted = true; db.Bookings.Update(e); db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Booking deleted." };
        }

        private BookingDto MapToDto(BookingData b) => new BookingDto { Id = b.Id, TourId = b.TourId, UserId = b.UserId, TourTitle = "", TourImage = null, GuideName = "", Date = b.Date.ToString("yyyy-MM-dd"), Participants = b.Participants, TotalPrice = b.TotalPrice, Currency = b.Currency, Status = b.Status, MeetingPoint = b.MeetingPoint, CreatedAt = b.CreatedAt.ToString("yyyy-MM-dd") };
    }
}
