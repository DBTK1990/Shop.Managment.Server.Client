using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;


namespace BL.Setup
{
    public static class BLMiddlewareExtensions
    {
        public static IApplicationBuilder InitAppDatabase(
            this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var Auth_DB = scope.ServiceProvider.GetService<AppContext>().Database;

                Auth_DB.Migrate();


            }
            return app;
        }
    }
}
