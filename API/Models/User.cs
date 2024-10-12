using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class User
{
    [Key]
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public required byte[] PasswordHash { get; set; }

    public required byte[] PasswordSalt { get; set; }

    public IEnumerable<Event> Events { get; set; } = [];
}
