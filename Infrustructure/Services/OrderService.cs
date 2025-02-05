using DataContext;
using Domain;
using Domain.Idenity;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Models.Order;
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

        if (existingOrder == null)
        {
            var orderRows = new List<OrderRow> { newOrderRow };

            var newOrder = new Order
            {
                AnonId = anonId,
                PaymentType = 0,
                IsPaid = false,
                OrderRows = orderRows,
            };

            newOrder.RecalculateTotal();
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

            existingOrder.RecalculateTotal();
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

    public IList<OrderModel> GetOrders(int skip, int take, bool requireTotalCount)
    {
        var orders = _db.Orders?
           .Include(o => o.OrderRows)
           .ThenInclude(or => or.Meal)
           .OrderBy(e => e.Id)
           .Where(e => e.IsPaid == true)
           .Skip(skip)
           .Take(take).ToList();

        if (orders == null)
            return new List<OrderModel>();

        var orderModels = orders.Select(order => new OrderModel
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
        }).ToList();

        return orderModels;
    }
    public int UptadeAmount(Guid anonId, int mealId, bool increment)
    {
        var orderRow = _db.Orders
             .Where(o => o.AnonId == anonId && !o.IsPaid)
             .OrderByDescending(o => o.Id)
             .SelectMany(o => o.OrderRows)
             .Include(or => or.Meal)
             .FirstOrDefault(or => or.Meal.Id == mealId);

        if (orderRow != null && increment)
            orderRow.Amount += 1;
        else if (orderRow.Amount > 1)
            orderRow.Amount -= 1;

        var amount = orderRow.Amount;

        var order = _db.Orders
                        .Include(o => o.OrderRows)
                        .FirstOrDefault(o => o.AnonId == anonId && !o.IsPaid);

        if (order != null)
        {
            order.RecalculateTotal(); 
        }

        _db.SaveChanges();

        return amount;
    }

    public void DeleteOrderRow(Guid anonId, int mealId)
    {

        var order = _db.Orders?
            .Include(o => o.OrderRows)
            .ThenInclude(o => o.Meal)
            .OrderBy(e => e.Id)
            .LastOrDefault(e => e.AnonId == anonId && e.IsPaid == false);
        if (order != null)
        {
            var orderRowToDelete = order.OrderRows.FirstOrDefault(or => or.Meal.Id == mealId);

            if (orderRowToDelete != null)
            {
                order.OrderRows.Remove(orderRowToDelete);
            }

        }
        if (order?.OrderRows?.Count != 0)
            order.RecalculateTotal();
        else
            _db.Orders.Remove(order);

        _db.SaveChanges();
    }

    public void PlaceOrder(Guid anonId, string name, string surname, string adress, string email, string phone, int paymentType, string additionalInfo)
    {
        var customer = new AppUser
        {
            FirstName = name,
            LastName = surname,
            Address = adress,
            Email = email,
            PhoneNumber = phone,
            EmailConfirmed=false,
            PhoneNumberConfirmed=false,
        };

        var order = _db.Orders
                         .OrderBy(e => e.Id)
                         .LastOrDefault(o => o.AnonId == anonId && o.IsPaid == false);
        order.Customer = customer;
        order.IsPaid = true;
        if(additionalInfo != null) 
            order.AdditionalInfo = additionalInfo;
        order.PaymentType = (Domain.Enums.PaymentType)paymentType;

        _db.SaveChanges();

    }

}
