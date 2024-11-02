using System;
using API.Models;

namespace API.Extensions;

public static class DateTimeExtensions
{
    public static TimeSpan CalculateTimeUntilStart(this Event ev) 
    {
        var now = DateTime.Now;

        var timeUntilStart = ev.Start - now;

        return timeUntilStart > TimeSpan.Zero ? timeUntilStart : TimeSpan.Zero;
    }
}
