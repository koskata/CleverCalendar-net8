using System;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class CleverCalendarContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Event> Events { get; set; }
}
