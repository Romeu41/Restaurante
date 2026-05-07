using System.ComponentModel.DataAnnotations;

namespace RestaurantManagement.API.Entities
{
    public enum CashFlowType
    {
        Income,
        Expense
    }

    public class CashFlow
    {
        public int Id { get; set; }

        public CashFlowType Type { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string? Description { get; set; }
    }
}
