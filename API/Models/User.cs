using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class User
{
    public User()
    {
        EventsParticipants = new HashSet<EventParticipant>();
    }

    [Key]
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public byte[] PasswordHash { get; set; } = [];

    public byte[] PasswordSalt { get; set; } = [];

    public IEnumerable<Event> Events { get; set; } = [];

    public virtual ICollection<EventParticipant> EventsParticipants { get; set; } = null!;
}
