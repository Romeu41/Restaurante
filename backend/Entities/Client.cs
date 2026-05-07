using System.ComponentModel.DataAnnotations;

namespace RestaurantManagement.API.Entities
{
    public class Client
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public string? Email { get; set; }
        public string? Phone { get; set; }
        public int LoyaltyPoints { get; set; }
        public string? Notes { get; set; }
    }
}
