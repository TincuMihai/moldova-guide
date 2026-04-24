using MoldovaGuide.DataAccess.Context;
using MoldovaGuide.Domain.Entities.Event;
using MoldovaGuide.Domain.Models.Event;
using MoldovaGuide.Domain.Models.Responses;

namespace MoldovaGuide.BusinessLayer.Core
{
    public class EventActions
    {
        protected EventActions() { }

        protected List<EventDto> GetAllEventsExecution()
        {
            using (var db = new EventContext()) { return db.Events.Where(x => !x.IsDeleted).ToList().Select(MapToDto).ToList(); }
        }

        protected EventDto? GetEventByIdExecution(int id)
        {
            using (var db = new EventContext()) { var e = db.Events.FirstOrDefault(x => x.Id == id && !x.IsDeleted); return e == null ? null : MapToDto(e); }
        }

        protected ActionResponse CreateEventExecution(EventCreateDto data)
        {
            using (var db = new EventContext())
            {
                db.Events.Add(new EventData { Title = data.Title, Description = data.Description, Category = data.Category, Date = DateTime.Parse(data.Date), Time = data.Time, Venue = data.Venue, Image = data.Image, Price = data.Price, CreatedAt = DateTime.Now });
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Event created." };
        }

        protected ActionResponse UpdateEventExecution(int id, EventCreateDto data)
        {
            using (var db = new EventContext())
            {
                var e = db.Events.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
                if (e == null) return new ActionResponse { IsSuccess = false, Message = "Event not found." };
                e.Title = data.Title; e.Description = data.Description; e.Category = data.Category; e.Date = DateTime.Parse(data.Date); e.Time = data.Time; e.Venue = data.Venue; e.Image = data.Image; e.Price = data.Price;
                db.Events.Update(e); db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Event updated." };
        }

        protected ActionResponse DeleteEventExecution(int id)
        {
            using (var db = new EventContext())
            {
                var e = db.Events.FirstOrDefault(x => x.Id == id);
                if (e == null) return new ActionResponse { IsSuccess = false, Message = "Event not found." };
                e.IsDeleted = true; db.Events.Update(e); db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Event deleted." };
        }

        private EventDto MapToDto(EventData e) => new EventDto { Id = e.Id, Title = e.Title, Description = e.Description, Category = e.Category, Date = e.Date.ToString("yyyy-MM-dd"), Time = e.Time, Venue = e.Venue, Image = e.Image, Price = e.Price };
    }
}
