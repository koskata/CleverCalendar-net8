using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class EventParticipant
{
    [Required]
    public int EventId { get; set; }

    public Event Event { get; set; } = null!;

    [Required]
    public Guid UserId { get; set; }

    public User User { get; set; } = null!;
}
