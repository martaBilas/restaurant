using Infrastructure.Models;

namespace Infrastructure.Interfaces;

public interface ICatalogService
{
    IList<CategoryItemModel> GetCategories();
}
