using System;
using System.IO.Compression;
using API.Data;
using API.DTOs;
using API.Interfaces.Event;
using API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class EventService(CleverCalendarContext _context) : IEventService
{
    private readonly CleverCalendarContext context = _context;

    public async Task<Event> CreateEventAsync(EventDto eventDto, string userId)
    {
        var eventModel = new Event()
        {
            Name = eventDto.Name,
            Start = DateTime.Parse(eventDto.Start),
            End = DateTime.Parse(eventDto.End),
            UserId = Guid.Parse(userId),
            CategoryId = eventDto.Category.Id
        };

        if (eventDto.Location is not null)
        {
            eventModel.Location = eventDto.Location;
        }

        await context.Events.AddAsync(eventModel);
        await context.SaveChangesAsync();

        return eventModel;
    }

    public async Task<List<EventCategoryDto>> GetAllEventCategoriesAsync()
    {
        var eventCategories = await context.EventCategories.Select(x => new EventCategoryDto()
        {
            Id = x.Id,
            Name = x.Name,
            Color = x.Color,
            Emoticon = x.Emoticon
        }).ToListAsync();

        return eventCategories;
    }

    public async Task<string> GetEventCreatorNameAsync(Guid id)
    {
        var user = await context.Users
        .Select(x => new UserDetailsDto()
        {
            Id = x.Id,
            Name = x.Name
        })
        .FirstOrDefaultAsync(x => x.Id == id);

        if (user is not null)
        {
            return user.Name;
        }

        return "";

    }

    public async Task<List<EventParticipant>> GetEventsParticipantsAsync()
    {
        var eventsParticipants = await context.EventsParticipants.ToListAsync();

        return eventsParticipants;
    }



    public async Task<EventParticipant?> JoinEventAsync(string userId, int eventId)
    {
        // Check if the user exists
        var user = await context.Users.FirstOrDefaultAsync(x => x.Id.ToString() == userId);
        if (user == null) return null;

        // Check if the user is already a participant in the event
        bool isAlreadyParticipant = await context.EventsParticipants
            .AnyAsync(x => x.UserId.ToString() == userId && x.EventId == eventId);

        if (isAlreadyParticipant) return null;

        // Add the user as a participant
        var eventParticipant = new EventParticipant
        {
            EventId = eventId,
            UserId = Guid.Parse(userId)
        };

        await context.EventsParticipants.AddAsync(eventParticipant);
        await context.SaveChangesAsync();

        return eventParticipant;
    }
}
