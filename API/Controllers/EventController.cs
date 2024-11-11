using System;
using API.Data;
using API.DTOs;
using API.Extensions;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;


public class EventController (CleverCalendarContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Event>>> GetEvents() 
    {
        var events = await context.Events.ToListAsync();

        return events;
    }

    // Test action
    [Authorize]
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Event>> GetEvent(int id)
    {
        var ev = await context.Events.FirstOrDefaultAsync(x => x.Id == id);

        if (ev == null)
        {
            return NotFound();
        }

        return ev;
    }

    [Authorize]
    [HttpPost("createEvent")]
    public async Task<ActionResult<EventDto>> CreateEvent(EventDto eventDto) {
        
        string userId = User.GetUserId();
        
        var eventModel = new Event() {
            Name = eventDto.Name,
            Start = DateTime.Parse(eventDto.Start),
            End = DateTime.Parse(eventDto.End),
            Location = eventDto.Location,
            UserId = Guid.Parse(userId),
            CategoryId = eventDto.CategoryId
        };

        await context.Events.AddAsync(eventModel);
        await context.SaveChangesAsync();

        return new EventDto() {
            Name = eventModel.Name,
            Start = eventModel.Start.ToString(),
            End = eventModel.End.ToString(),
            Location = eventModel.Location,
            CategoryId = eventModel.CategoryId
        };
    }
}
