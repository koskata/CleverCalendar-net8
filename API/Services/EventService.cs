using System;
using System.IO.Compression;
using API.Data;
using API.DTOs;
using API.Interfaces.Event;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class EventService(CleverCalendarContext _context) : IEventService
{
    private readonly CleverCalendarContext context = _context;

    public async Task<List<EventCategoryDto>> GetAllEventCategoriesAsync()
    {
        var eventCategories = await context.EventCategories.Select(x => new EventCategoryDto() {
            Id = x.Id,
            Name = x.Name,
            Color = x.Color,
            Emoticon = x.Emoticon
        }).ToListAsync();

        return eventCategories;
    }
}
