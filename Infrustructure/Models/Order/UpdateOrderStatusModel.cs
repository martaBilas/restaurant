namespace Infrastructure.Models.Order
{
    public class UpdateOrderStatusModel
    {
        public long OrderId { get; set; }
        public long OrderStatusId { get; set; }
        public long ChangedById { get; set; }
    }
}
