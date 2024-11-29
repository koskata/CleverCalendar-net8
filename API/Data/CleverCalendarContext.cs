using System;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class CleverCalendarContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Event> Events { get; set; }

    public DbSet<User> Users { get; set; }

    public DbSet<EventCategory> EventCategories { get; set; }

    public DbSet<EventParticipant> EventsParticipants { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Event>()
                .HasOne(x => x.Category)
                .WithMany(x => x.Events)
                .HasForeignKey(x => x.CategoryId)
                .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<EventParticipant>()
                .HasKey(x => new { x.EventId, x.UserId });

        modelBuilder.Entity<EventParticipant>()
            .HasOne(ep => ep.Event)
            .WithMany(e => e.EventsParticipants)
            .HasForeignKey(ep => ep.EventId);

        modelBuilder.Entity<EventParticipant>()
            .HasOne(ep => ep.User)
            .WithMany(u => u.EventsParticipants)
            .HasForeignKey(ep => ep.UserId);

        base.OnModelCreating(modelBuilder);
    }
}
