using System;
using API.DTOs;

namespace API.Interfaces.Event;

public interface IEventService
{
    Task<List<EventCategoryDto>> GetAllEventCategoriesAsync();
}
