using System.ComponentModel.DataAnnotations;

namespace RestaurantManagement.API.Entities
{
    public enum TableStatus
    {
        Available,
        Occupied,
        Reserved,
        Maintenance
    }

    public class RestaurantTable
    {
        public int Id { get; set; }

        [Required]
        public int Number { get; set; }

        [Required]
        public TableStatus Status { get; set; }

        public ICollection<Order>? Orders { get; set; }
    }
}
