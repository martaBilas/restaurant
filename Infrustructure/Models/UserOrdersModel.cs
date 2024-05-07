namespace Infrastructure.Models;

public class UserOrdersModel
{
    public ICollection<OrderModel> Orders { get; set; }
}
