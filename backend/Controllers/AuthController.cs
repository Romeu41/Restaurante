using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagement.API.DTOs;
using RestaurantManagement.API.Services.Interfaces;

namespace RestaurantManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;

        public AuthController(IAuthService authService, IMapper mapper)
        {
            _authService = authService;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthLoginDto loginDto)
        {
            var user = await _authService.AuthenticateAsync(loginDto);
            if (user == null)
            {
                return Unauthorized(new { message = "Credenciais inválidas." });
            }

            var token = await _authService.GenerateTokenAsync(user);
            return Ok(new { token, expiresIn = 1440, user });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto registerDto)
        {
            var user = await _authService.RegisterAsync(registerDto);
            return CreatedAtAction(nameof(Register), new { id = user.Id }, user);
        }

        [HttpPost("seed")]
        public async Task<IActionResult> Seed()
        {
            await _authService.SeedAsync();
            return Ok("Database seeded successfully");
        }
    }
}
