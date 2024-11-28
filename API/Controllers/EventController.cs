using System;
using API.Data;
using API.DTOs;
using API.Extensions;
using API.Interfaces.Event;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;


public class EventController(CleverCalendarContext context, IEventService _eventService) : BaseApiController
{

    private readonly IEventService eventService = _eventService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
    {
        var events = await context.Events.ToListAsync();

        return events;
    }


    [Authorize]
    [HttpGet("{id:int}")]
    public async Task<ActionResult<EventDetailsDto>> GetEvent(int id)
    {
        var ev = await context.Events
        .FirstOrDefaultAsync(x => x.Id == id);

        if (ev == null)
        {
            return NotFound();
        }

        string creatorName = await eventService.GetEventCreatorNameAsync(ev.UserId);

        string currentUserId = User.GetUserId();

        return new EventDetailsDto
        {
            Id = ev.Id,
            Name = ev.Name,
            Start = ev.Start,
            End = ev.End,
            Location = ev.Location,
            CreatorName = creatorName,
            CategoryId = ev.CategoryId,
            CurrentUserId = currentUserId
        };
    }

    [Authorize]
    [HttpPost("createEvent")]
    public async Task<ActionResult<EventDto>> CreateEvent(EventDto eventDto)
    {

        string userId = User.GetUserId();

        var eventModel = await eventService.CreateEventAsync(eventDto, userId);

        return new EventDto()
        {
            Name = eventModel.Name,
            Start = eventModel.Start.ToString(),
            End = eventModel.End.ToString(),
            Location = eventModel.Location,
            Category = eventModel.Category
        };
    }

    [Authorize]
    [HttpGet("getAllEventCategories")]
    public async Task<ActionResult<List<EventCategoryDto>>> GetAllEventCategories()
    {
        var eventCategories = await eventService.GetAllEventCategoriesAsync();

        return eventCategories;
    }

    [Authorize]
    [HttpPost("joinEvent")]
    public async Task<ActionResult<EventParticipantJoinDto>> JoinEvent(EventDetailsDto eventModel)
    {
        string userId = User.GetUserId();

        var eventParticipantModel = await eventService.JoinEventAsync(userId, eventModel);

        return new EventParticipantJoinDto {
            EventId = eventParticipantModel.EventId,
            UserId = eventParticipantModel.UserId.ToString()
        };
    }
}
