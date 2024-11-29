using System;
using API.DTOs;
using API.Models;

namespace API.Interfaces.Event;

public interface IEventService
{
    Task<List<EventCategoryDto>> GetAllEventCategoriesAsync();

    Task<API.Models.Event> CreateEventAsync(EventDto eventDto, string userId);

    Task<string> GetEventCreatorNameAsync(Guid id);

    Task<EventParticipant?> JoinEventAsync(string userId, int eventId);

    Task<List<EventParticipant>> GetEventsParticipantsAsync();
}
