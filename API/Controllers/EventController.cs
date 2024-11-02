using System;
using API.Data;
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
}
