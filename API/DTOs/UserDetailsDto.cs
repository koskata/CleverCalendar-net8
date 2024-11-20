using System;

namespace API.DTOs;

public class UserDetailsDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
}
