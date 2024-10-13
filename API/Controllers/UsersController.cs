using System;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class UsersController(CleverCalendarContext context) : BaseApiController
{
    // Write logic 
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers() 
    {
        var users = await context.Users.ToListAsync();

        return users;
    }

    // Test action
    [Authorize]
    [HttpGet("{id:Guid}")]
    public async Task<ActionResult<User>> GetUser(Guid id)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.Id == id);

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }
}
