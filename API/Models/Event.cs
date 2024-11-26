using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Event
{
    public Event()
    {
        EventsParticipants = new HashSet<EventParticipant>();
    }

    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public DateTime Start { get; set; }

    [Required]
    public DateTime End { get; set; }

    public string? Location { get; set; }

    [Required]
    public Guid UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public User User { get; set; } = null!;

    //Adding new property
    public int CategoryId { get; set; }

    [ForeignKey(nameof(CategoryId))]
    public EventCategory Category { get; set; } = null!;

    public virtual ICollection<EventParticipant> EventsParticipants { get; set; } = null!;
}
