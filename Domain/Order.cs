using Domain.Enums;
using Domain.Idenity;
using System.ComponentModel.DataAnnotations;

namespace Domain;

public class Order
{
    [Key]
    public long Id { get; set; }

    public Guid AnonId { get; set; }
    public virtual ICollection<OrderRow>? OrderRows { get; set; }
    public virtual AppUser? Customer { get; set; }
    public bool IsPaid { get; set; }
    public PaymentType PaymentType { get; set; }
    public double Total
    {
        get
        {
            return OrderRows?.Sum(x => x.Total) ?? 0;

        }
    }

    public string? AdditionalInfo { get; set; }
}
