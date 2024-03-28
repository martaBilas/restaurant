
using Infrastructure.Models;

namespace Infrastructure.Interfaces;

public interface IOrderService
{
    public void AddOrUpdateOrder(Guid anonId, int mealId, int amount);
    public void DeleteOrderRow(Guid anonId, int mealId);
    public OrderModel GetOrder(Guid? anonId);
    public int UptadeAmount(Guid anonId, int mealId, bool increment);
}
