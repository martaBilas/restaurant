using DataContext;
using Domain;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class OrderService : IOrderService
{
    private readonly RestaurantDataContext _db;

    public OrderService(RestaurantDataContext db)
    {
        _db = db;
    }

    public void AddOrUpdateOrder(Guid anonId, int mealId, int amount)
    {
        var meal = _db.Meals.FirstOrDefault(e => e.Id == mealId);

        var newOrderRow = new OrderRow
        {
            Meal = meal,
            Amount = amount,
            Price = meal.Price
        };

        var existingOrder = _db.Orders
            .Include(o => o.OrderRows)
            .ThenInclude(o => o.Meal)
            .OrderBy(e => e.Id)
            .LastOrDefault(o => o.AnonId == anonId && o.IsPaid == false);

        if (existingOrder == null || existingOrder.IsPaid == true)
        {
            var orderRows = new List<OrderRow> { newOrderRow };

            var newOrder = new Order
            {
                AnonId = anonId,
                PaymentType = 0,
                IsPaid = false,
                OrderRows = orderRows,
            };

            _db.Orders.Add(newOrder);
        }
        else
        {
            var orderRow = existingOrder.OrderRows?
                .Where(or => or.Meal.Id == mealId)
                .FirstOrDefault();

            if (orderRow != null)
                orderRow.Amount += amount;
            else
                existingOrder.OrderRows.Add(newOrderRow);
        }

        _db.SaveChanges();
    }

    public OrderModel GetOrder(Guid? anonId)
    {
        var order = _db.Orders?
            .Include(o => o.OrderRows)
            .ThenInclude(o => o.Meal)
            .OrderBy(e => e.Id)
            .LastOrDefault(e => e.AnonId == anonId && e.IsPaid == false);

        if (order == null)
            return new OrderModel();

        var orderModel = new OrderModel
        {
            Id = order.Id,
            OrderRows = order.OrderRows?.Select(or => new OrderRowModel
            {
                Id = or.Id,
                Price = or.Price,
                Amount = or.Amount,
                MealName = or.Meal.Name,
                Weight = or.Meal.Weight,
                ImageUrl = or.Meal.ImageUrl
            }).ToList()
        };
        return orderModel;
    }
    public object UptadeAmount(Guid anonId, int rowId, bool increment)
    {
        var orderRow = _db.Orders
            .Include(o => o.OrderRows)
            .OrderBy(e => e.Id)
            .LastOrDefault(o => o.AnonId == anonId && o.IsPaid == false)?
            .OrderRows?
            .FirstOrDefault(o => o.Id == rowId);

        if (orderRow == null)
            return null;

        if (increment)
            orderRow.Amount += 1;
        else if (orderRow.Amount > 1)
            orderRow.Amount -= 1;

        _db.SaveChanges();

        var order = _db.Orders
            .Include(o => o.OrderRows)
            .OrderBy(e => e.Id)
            .LastOrDefault(o => o.AnonId == anonId && o.IsPaid == false);

        var data = new { Amount = orderRow.Amount, Sum = orderRow.Total, Total = order?.Total };
        return data;
    }

    public void DeleteOrderRow(Guid anonId, int rowId)
    {
        var order = _db.Orders
            .Include(o => o.OrderRows)?
            .OrderBy(e => e.Id)
            .LastOrDefault(o => o.AnonId == anonId && o.IsPaid == false);
        var orderRow = order.OrderRows.FirstOrDefault(o => o.Id == rowId);

        _db.OrderRows.Remove(orderRow);
        _db.SaveChanges();

        if (order?.OrderRows?.Count == 0)
            _db.Orders.Remove(order);

        _db.SaveChanges();
    }

}
