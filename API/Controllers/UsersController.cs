using System;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class UsersController(CleverCalendarContext context) : BaseApiController
{
    // Write logic 

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers() 
    {
        var users = await context.Users.ToListAsync();

        return users;
    }
}
