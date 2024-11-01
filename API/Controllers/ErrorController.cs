using System;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ErrorController(CleverCalendarContext context) : BaseApiController
{
    [Authorize]
    [HttpGet("auth")]
    public ActionResult<string> GetAuth()
    {
        return "secret text";
    }

    [HttpGet("not-found")]
    public ActionResult<User> GetNotFound()
    {
        var thing = context.Users.Find(Guid.Parse("81f81573-99f7-424a-9d7e-6173a7df2e91"));

        if (thing == null)
        {
            return NotFound();
        }

        return thing;
    }

    [HttpGet("server-error")]
    public ActionResult<User> GetServerError()
    {

        var thing = context.Users.Find(Guid.Parse("81f81573-99f7-424a-9d7e-6173a7df2e91")) ?? throw new Exception("A bad thing has happened");
        return thing;

    }

    [HttpGet("bad-request")]
    public ActionResult<string> GetBadRequest()
    {
        return BadRequest("This was not a good request");
    }
}
