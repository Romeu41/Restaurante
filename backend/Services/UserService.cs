using AutoMapper;
using RestaurantManagement.API.DTOs;
using RestaurantManagement.API.Repositories.Interfaces;
using RestaurantManagement.API.Services.Interfaces;

namespace RestaurantManagement.API.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserDto>> GetUsersAsync()
        {
            return await Task.FromResult(new List<UserDto>());
        }

        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            var user = await _repository.GetByIdAsync(id);
            return user == null ? null : _mapper.Map<UserDto>(user);
        }
    }
}
