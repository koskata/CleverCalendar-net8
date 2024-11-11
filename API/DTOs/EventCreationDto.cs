using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class EventCreationDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Start { get; set; } = string.Empty;

    [Required]
    public string End { get; set; } = string.Empty;

    public string? Location { get; set; }

    [Required]
    public string User { get; set; } = string.Empty;

    //Adding new property
    public string Category { get; set; } = string.Empty;
}
