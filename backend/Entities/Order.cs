using System.ComponentModel.DataAnnotations;

namespace RestaurantManagement.API.Entities
{
    public enum OrderStatus
    {
        Pending,
        Preparing,
        Ready,
        Delivered,
        Cancelled
    }

    public class Order
    {
        public int Id { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public string? Notes { get; set; }
        public decimal Total { get; set; }

        public int TableId { get; set; }
        public RestaurantTable? Table { get; set; }

        public int? ClientId { get; set; }
        public Client? Client { get; set; }

        public ICollection<OrderItem>? OrderItems { get; set; }
    }
}
