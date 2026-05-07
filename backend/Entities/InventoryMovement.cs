using System.ComponentModel.DataAnnotations;

namespace RestaurantManagement.API.Entities
{
    public enum InventoryType
    {
        Entry,
        Exit
    }

    public class InventoryMovement
    {
        public int Id { get; set; }

        public int ProductId { get; set; }
        public Product? Product { get; set; }

        public InventoryType MovementType { get; set; }
        public int Quantity { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string? Notes { get; set; }
    }
}
