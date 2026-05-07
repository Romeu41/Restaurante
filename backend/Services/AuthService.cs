using AutoMapper;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RestaurantManagement.API.DTOs;
using RestaurantManagement.API.Entities;
using RestaurantManagement.API.Repositories.Interfaces;
using RestaurantManagement.API.Services.Interfaces;
using RestaurantManagement.API.Settings;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RestaurantManagement.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly JwtSettings _jwtSettings;

        public AuthService(IUserRepository userRepository, IMapper mapper, IOptions<JwtSettings> jwtOptions)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _jwtSettings = jwtOptions.Value;
        }

        public async Task<UserDto?> AuthenticateAsync(AuthLoginDto credentials)
        {
            var user = await _userRepository.GetByEmailAsync(credentials.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(credentials.Password, user.PasswordHash))
            {
                return null;
            }

            return _mapper.Map<UserDto>(user);
        }

        public async Task<string> GenerateTokenAsync(UserDto user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtSettings.ExpiryMinutes),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<UserDto> RegisterAsync(UserRegisterDto userRegisterDto)
        {
            var existing = await _userRepository.GetByEmailAsync(userRegisterDto.Email);
            if (existing != null)
            {
                throw new InvalidOperationException("Email já cadastrado.");
            }

            var user = new User
            {
                Name = userRegisterDto.Name,
                Email = userRegisterDto.Email,
                RoleId = userRegisterDto.Role.ToLower() switch
                {
                    "administrador" => 1,
                    "caixa" => 2,
                    "garcom" => 3,
                    "cozinha" => 4,
                    _ => 3
                },
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userRegisterDto.Password)
            };

            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();
            return _mapper.Map<UserDto>(user);
        }

        public async Task SeedAsync()
        {
            try
            {
                var admin = new User
                {
                    Name = "Administrador",
                    Email = "admin@restaurante.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                    RoleId = 1
                };
                await _userRepository.AddAsync(admin);
                await _userRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                // Ignore if already seeded
            }
        }
    }
}
