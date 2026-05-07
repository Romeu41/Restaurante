using System.Collections.Generic;

namespace RestaurantManagement.API.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string Status { get; set; } = string.Empty;
        public decimal Total { get; set; }
        public string? Notes { get; set; }
        public int TableId { get; set; }
        public List<OrderItemDto> Items { get; set; } = new();
    }
}
