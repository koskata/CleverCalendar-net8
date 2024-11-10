using System;
using System.Text.Json;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedCategories(CleverCalendarContext context)
    {
        if (await context.EventCategories.AnyAsync())
        {
            return;
        }

        var categoriesData = await File.ReadAllTextAsync("Data/CategoriesSeedData.json");
        var options = new JsonSerializerOptions {PropertyNameCaseInsensitive = true};

        var categories = JsonSerializer.Deserialize<List<EventCategory>>(categoriesData, options);

        if (categories == null)
        {
            return;
        }

        foreach (var category in categories)
        {
            await context.EventCategories.AddAsync(category);
        }

        await context.SaveChangesAsync();
    }
}
