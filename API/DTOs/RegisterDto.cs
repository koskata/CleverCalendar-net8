using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [StringLength(15, MinimumLength = 4)]
    public string Password { get; set; } = string.Empty;
}
