using System;
using API.Interfaces.Event;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class EventParticipantController(IEventService _eventService) : BaseApiController
{
    private readonly IEventService eventService = _eventService;

    [Authorize]
    [HttpGet("{id:int}")]
    public async Task<ActionResult<IEnumerable<User>>> GetEventsParticipantsForTheGivenEvent(int id)
    {
        var users = await eventService.GetParticipantsForTheGivenEventAsync(id);

        return users;
    }
}
