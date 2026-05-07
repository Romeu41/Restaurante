using RestaurantManagement.API.Entities;
using System.Linq;

namespace RestaurantManagement.API.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByIdAsync(int id);
        Task AddAsync(User user);
        Task SaveChangesAsync();
        IQueryable<User> GetAllAsync();
    }
}
