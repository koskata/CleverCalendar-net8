using System;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(CleverCalendarContext context) : ControllerBase
{
    // Write logic 

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers() 
    {
        var users = await context.Users.ToListAsync();

        return users;
    }
}
