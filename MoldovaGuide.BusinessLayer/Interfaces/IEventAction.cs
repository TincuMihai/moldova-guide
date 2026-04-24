using MoldovaGuide.Domain.Models.Event;
using MoldovaGuide.Domain.Models.Responses;

namespace MoldovaGuide.BusinessLayer.Interfaces
{
    public interface IEventAction
    {
        List<EventDto> GetAllEventsAction();
        EventDto? GetEventByIdAction(int id);
        ActionResponse CreateEventAction(EventCreateDto data);
        ActionResponse UpdateEventAction(int id, EventCreateDto data);
        ActionResponse DeleteEventAction(int id);
    }
}
