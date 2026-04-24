using MoldovaGuide.BusinessLayer.Core;
using MoldovaGuide.BusinessLayer.Interfaces;
using MoldovaGuide.Domain.Models.Event;
using MoldovaGuide.Domain.Models.Responses;

namespace MoldovaGuide.BusinessLayer.Structure
{
    public class EventActionExecution : EventActions, IEventAction
    {
        public List<EventDto> GetAllEventsAction() => GetAllEventsExecution();
        public EventDto? GetEventByIdAction(int id) => GetEventByIdExecution(id);
        public ActionResponse CreateEventAction(EventCreateDto data) => CreateEventExecution(data);
        public ActionResponse UpdateEventAction(int id, EventCreateDto data) => UpdateEventExecution(id, data);
        public ActionResponse DeleteEventAction(int id) => DeleteEventExecution(id);
    }
}
