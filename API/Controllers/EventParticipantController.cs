using System;
using API.Interfaces.Event;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class EventParticipantController(IEventService _eventService) : BaseApiController
{
    private readonly IEventService eventService = _eventService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EventParticipant>>> GetEventsParticipants()
    {
        var eventsParticipants = await eventService.GetEventsParticipantsAsync();

        return eventsParticipants;
    }
}
