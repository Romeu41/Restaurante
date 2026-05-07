using RestaurantManagement.API.DTOs;

namespace RestaurantManagement.API.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetUsersAsync();
        Task<UserDto?> GetUserByIdAsync(int id);
    }
}
