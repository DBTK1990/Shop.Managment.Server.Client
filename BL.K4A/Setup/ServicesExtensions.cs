using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace BL.Setup
{
    public static class ServicesExtensions
    {
        public static void AddAppDbContext(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<AppContext>(options => options.UseSqlServer(config.GetConnectionString("ConnStr")));

           
        }
    }
}
