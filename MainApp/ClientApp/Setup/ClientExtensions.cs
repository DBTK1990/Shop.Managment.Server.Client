using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SpaServices;

namespace BL.Setup
{
    public static class ClientExtensions
    {
        public static void AddClientReact(this IServiceCollection services)
        {
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/appoinment-client/build";
            });
        }
    }
}
