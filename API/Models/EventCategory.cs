using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class EventCategory
{
    public EventCategory()
    {
        Events = new HashSet<Event>();
    }

    [Required]
    [Key]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Color { get; set; } = string.Empty;

    [Required]
    public string Emoticon { get; set; } = string.Empty;

    public IEnumerable<Event> Events { get; set; }
}
