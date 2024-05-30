namespace Infrastructure.Models;

public class OrderModel
{
    public long Id { get; set; }
    public IEnumerable<OrderRowModel>? OrderRows { get; set; }
    public double Total
    {
        get
        {
            return OrderRows?.Sum(x => x.Sum) ?? 0;

        }
    }
}
