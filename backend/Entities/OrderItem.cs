using System.ComponentModel.DataAnnotations;

namespace RestaurantManagement.API.Entities
{
    public class OrderItem
    {
        public int Id { get; set; }

        public int OrderId { get; set; }
        public Order? Order { get; set; }

        public int ProductId { get; set; }
        public Product? Product { get; set; }

        [Required]
        public int Quantity { get; set; }

        public decimal Price { get; set; }
        public string? Notes { get; set; }
    }
}
