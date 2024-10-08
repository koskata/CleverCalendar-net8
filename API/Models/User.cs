using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class User
{
    [Key]
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    // public byte[] PasswordHash { get; set; } = [];

    // public byte[] PasswordSalt { get; set; } = [];

    public IEnumerable<Event> Events { get; set; } = [];
}
