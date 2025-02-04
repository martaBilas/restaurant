using Infrastructure.Interfaces;
using Infrastructure.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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

    [HttpPost("signIn")]
    public async Task<IActionResult> SignIn(SignInModel model)
    {
        var (user, message) = await _userService.SignInAsync(model.Email, model.Password);
        if (user != null)
            return Ok(user);
        else
            return Ok(new { message = message });
    }


    [HttpGet("logOut")]
    public async Task<IActionResult> LogOut()
    {
        try
        {
            var result = await _userService.LogOutAsync();

            if (result)
                return Ok(new { message = "You have been successfully logged out." });
            else
                return StatusCode(500, new { error = "Logout failed." });

        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "An unexpected error occurred." });
        }
    }

    [HttpGet("{email}", Name = "GetUserOrders")]
    public async Task<IActionResult> GetUserPaidOrders(string email)
    {
        try
        {
            var userOrders = await _userService.GetUserOrdersByEmail(email);
            return Ok(userOrders);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("UpdateUserInfo")]
    public async Task<IActionResult> UpdateUserInfoAsync([FromBody] UpdateUserInfoModel newInfo)
    {
        var result = await _userService.UpdateUserInfoAsync(newInfo.Email, newInfo.NewEmail, newInfo.PhoneNumber, newInfo.FirstName, newInfo.LastName, newInfo.Address);

        if (result.Succeeded)
        {
            return Ok();
        }

        return BadRequest(result.Errors);
    }

    [HttpPut("UpdateUserPassword")]
    public async Task<IActionResult> UpdatePasswordAsync([FromBody] UpdateUserPasswordModel model)
    {
        IdentityResult result = await _userService.UpdateUserPasswordAsync(model.Email, model.OldPassword, model.NewPassword);

        if (result.Succeeded)
        {
            return Ok();
        }

        return BadRequest(result.Errors);
    }
}
