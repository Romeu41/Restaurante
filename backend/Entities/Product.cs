using System.ComponentModel.DataAnnotations;

namespace RestaurantManagement.API.Entities
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }
        public decimal Price { get; set; }
        public bool Available { get; set; } = true;
        public int Stock { get; set; }
        public string? ImageUrl { get; set; }

        public int CategoryId { get; set; }
        public Category? Category { get; set; }
    }
}
