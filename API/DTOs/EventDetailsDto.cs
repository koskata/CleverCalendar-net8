using System;

namespace API.DTOs;

public class EventDetailsDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public string? Location { get; set; }
    public string CreatorName { get; set; } = string.Empty;
}
