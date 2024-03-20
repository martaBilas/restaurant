﻿
using Infrastructure.Models;

namespace Infrastructure.Interfaces;

public interface IOrderService
{
    void AddOrUpdateOrder(Guid anonId, int mealId, int amount);
    void DeleteOrderRow(Guid anonId, int rowId);
    public OrderModel GetOrder(Guid? anonId);
    object UptadeAmount(Guid anonId, int rowId, bool increment);
}