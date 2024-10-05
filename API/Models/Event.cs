using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class Event
{
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
    
}
