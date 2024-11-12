using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class EventCategoryDto
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Color { get; set; } = string.Empty;

    [Required]
    public string Emoticon { get; set; } = string.Empty;
}
