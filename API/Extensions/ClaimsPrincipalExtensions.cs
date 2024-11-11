using System;
using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static string GetUserId(this ClaimsPrincipal user)
    {
        string userId = user.FindFirstValue(ClaimTypes.Name) ?? throw new Exception("Cannot get username from token!");
        return userId;
    }
}
