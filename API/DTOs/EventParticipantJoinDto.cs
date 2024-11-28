using System;

namespace API.DTOs;

public class EventParticipantJoinDto
{
    public int EventId { get; set; }
    public string UserId { get; set; } = string.Empty;
}
