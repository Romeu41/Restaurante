using RestaurantManagement.API.DTOs;

namespace RestaurantManagement.API.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string> GenerateTokenAsync(UserDto user);
        Task<UserDto?> AuthenticateAsync(AuthLoginDto credentials);
        Task<UserDto> RegisterAsync(UserRegisterDto userRegisterDto);
        Task SeedAsync();
    }
}
