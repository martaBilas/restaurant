using Domain;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace restaurant.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{

    public readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("signUp")]
    public async Task<IActionResult> CreateUser(CreateUserModel model)
    {
        var result = await _userService.CreateUserAsync(model.Address, model.Email, model.FirstName, model.LastName, model.PhoneNumber, model.Password, "user");
        if (result.Succeeded)
            return Ok(result);
        else
            return BadRequest(result);
    }

    [HttpGet("signIn")]
    public async Task<IActionResult> SignIn(SignInModel model)
    {
        var result = await _userService.SignInAsync(model.Email, model.Password);
        if (result.Succeeded)
            return Ok(result);
        else
            return BadRequest(result);
    }

    [HttpGet("logOut")]
    public async Task<IActionResult> LogOut()
    {
        try {
            var result = await _userService.LogOutAsync();

            if (result)
                return Ok(new { message = "You have been successfully logged out." });
            else
                return StatusCode(500, new { error = "Logout failed." });

        }
        catch (Exception ex) {
            return StatusCode(500, new { error = "An unexpected error occurred." });
        }
    }
}
  
