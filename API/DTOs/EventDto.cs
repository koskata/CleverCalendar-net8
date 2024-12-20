using System;
using System.ComponentModel.DataAnnotations;
using API.Models;

namespace API.DTOs;

public class EventDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Start { get; set; } = string.Empty;

    [Required]
    public string End { get; set; } = string.Empty;

    public string? Location { get; set; }

    // public string User { get; set; } = string.Empty;

    public EventCategory Category { get; set; } = null!;
}
