using Microsoft.EntityFrameworkCore;
using RestaurantManagement.API.Entities;
using System.Linq;

namespace RestaurantManagement.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Role> Roles => Set<Role>();
        public DbSet<RestaurantTable> Tables => Set<RestaurantTable>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<Product> Products => Set<Product>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<OrderItem> OrderItems => Set<OrderItem>();
        public DbSet<Client> Clients => Set<Client>();
        public DbSet<InventoryMovement> InventoryMovements => Set<InventoryMovement>();
        public DbSet<CashFlow> CashFlows => Set<CashFlow>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Name = "administrador" },
                new Role { Id = 2, Name = "caixa" },
                new Role { Id = 3, Name = "garcom" },
                new Role { Id = 4, Name = "cozinha" });

            modelBuilder.Entity<RestaurantTable>().HasMany(t => t.Orders).WithOne(o => o.Table).HasForeignKey(o => o.TableId);
            modelBuilder.Entity<Category>().HasMany(c => c.Products).WithOne(p => p.Category).HasForeignKey(p => p.CategoryId);
            modelBuilder.Entity<Order>().HasMany(o => o.OrderItems).WithOne(i => i.Order).HasForeignKey(i => i.OrderId);

            base.OnModelCreating(modelBuilder);
        }

        public static void Seed(ApplicationDbContext context)
        {
            // Seed method removed - will be called manually after migrations
        }
    }
}
